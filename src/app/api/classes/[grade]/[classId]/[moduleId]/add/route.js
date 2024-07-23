import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "teacher") {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const { grade, classId, moduleId } = params;

    if (!grade || !classId || !moduleId) {
      return NextResponse.json(
        { message: "Grade, classId, or moduleId not provided!" },
        { status: 400 }
      );
    }

    let ClassModel;
    switch (grade.toLowerCase()) {
      case "lycee":
        ClassModel = Lycee;
        break;
      case "cem":
        ClassModel = Cem;
        break;
      case "primaire":
        ClassModel = Primaire;
        break;
      default:
        return NextResponse.json(
          { message: "Invalid grade provided!" },
          { status: 400 }
        );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const name = formData.get("name");
    const type = formData.get("type");

    if (!name || !type || !file) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const fileUrl = await handleFileUpload(file);
    if (!fileUrl) {
      return NextResponse.json(
        { message: "Failed to upload file!" },
        { status: 500 }
      );
    }

    const fileExtension = file.name.split(".").pop();

    const newCourse = {
      name,
      type,
      date: new Date(),
      link: fileUrl,
      file: fileExtension,
      comments: [],
    };

    const result = await ClassModel.findOneAndUpdate(
      { "classes._id": classId, "classes.modules._id": moduleId },
      {
        $push: { "classes.$[cls].modules.$[mod].courses": newCourse },
      },
      {
        arrayFilters: [{ "cls._id": classId }, { "mod._id": moduleId }],
        new: true,
      }
    );

    if (!result) {
      return NextResponse.json(
        { message: "Class or module not found!" },
        { status: 404 }
      );
    }

    const updatedModule = result.classes
      .find((cls) => cls._id.toString() === classId)
      .modules.find((mod) => mod._id.toString() === moduleId);
    const addedCourse = updatedModule.courses.find(
      (course) => course.name === name && course.link === fileUrl
    );

    return NextResponse.json(
      {
        message: "Course added successfully!",
        course: {
          id: addedCourse._id,
          courseName: addedCourse.name,
          courseDate: addedCourse.date.toISOString().split("T")[0],
          type: addedCourse.type,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add course error:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the course." },
      { status: 500 }
    );
  }
}

async function handleFileUpload(blob) {
  const file = new File([blob], "CourseFile", { type: blob.type });
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "vtxres570000");

  try {
    const response = await fetch(process.env.CLOUDINARY_FILE_API, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload Error:", errorData);
      return null;
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload Error:", error);
    return null;
  }
}
