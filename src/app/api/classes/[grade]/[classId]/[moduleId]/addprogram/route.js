import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin") {
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

    if (!file) {
      return NextResponse.json(
        { message: "File is required!" },
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

    const result = await ClassModel.findOneAndUpdate(
      { "classes._id": classId, "classes.modules._id": moduleId },
      {
        $set: { "classes.$[cls].modules.$[mod].program": fileUrl },
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

    return NextResponse.json(
      {
        message: "Program added successfully!",
        program: fileUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add program error:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the program." },
      { status: 500 }
    );
  }
}

async function handleFileUpload(blob) {
  const file = new File([blob], "ProgramFile", { type: blob.type });
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
