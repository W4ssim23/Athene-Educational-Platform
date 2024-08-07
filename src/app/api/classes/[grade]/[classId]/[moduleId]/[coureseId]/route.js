import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const { grade, classId, moduleId, coureseId } = params;

    if (!grade || !classId || !moduleId || !coureseId) {
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
      (course) => course._id.toString() === coureseId
    );

    if (!course) {
      return NextResponse.json(
        { message: "Course not found!" },
        { status: 404 }
      );
    }

    const courseData = {
      id: course._id,
      courseName: course.name,
      courseType: course.type,
      courseDate: course.date.toISOString().split("T")[0],
      courseLink: course.link,
      courseFile: course.file,
      className: cls.name,
      moduleName: mod.name,
      comments: course.comments.map((comment) => ({
        studentName: comment.student.name,
        studentPfp: comment.student.pfp,
        studentId: comment.student.id,
        comment: comment.comment,
      })),
    };

    return NextResponse.json({ course: courseData }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the course data." },
      { status: 500 }
    );
  }
}
