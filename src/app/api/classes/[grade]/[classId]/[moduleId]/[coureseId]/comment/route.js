import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role === "student") {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const { grade, classId, moduleId, courseId } = params;
    const { comment } = await req.json();

    if (!grade || !classId || !moduleId || !courseId || !comment) {
      return NextResponse.json(
        { message: "Not enough data provided!" },
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

    const classData = await ClassModel.findOne(
      { "classes._id": classId },
      { "classes.$": 1 }
    );

    if (!classData) {
      return NextResponse.json(
        { message: "Class not found!" },
        { status: 404 }
      );
    }

    const cls = classData.classes[0];
    const mod = cls.modules.find(
      (module) => module._id.toString() === moduleId
    );

    if (!mod) {
      return NextResponse.json(
        { message: "Module not found!" },
        { status: 404 }
      );
    }

    const course = mod.courses.find(
      (course) => course._id.toString() === courseId
    );

    if (!course) {
      return NextResponse.json(
        { message: "Course not found!" },
        { status: 404 }
      );
    }

    const newComment = {
      student: {
        name: user.firstName + " " + user.lastName,
        pfp: user.pfp,
        id: user.id,
      },
      comment: comment,
    };

    course.comments.push(newComment);
    await classData.save();

    return NextResponse.json(
      { message: "Comment added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the comment." },
      { status: 500 }
    );
  }
}
