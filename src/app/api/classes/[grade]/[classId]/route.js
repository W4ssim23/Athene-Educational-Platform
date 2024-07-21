import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import User from "@/app/lib/models/User";
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

    const { grade, classId } = params;

    if (!grade || !classId) {
      return NextResponse.json(
        { message: "Grade or classId not provided!" },
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
    const modules = await Promise.all(
      cls.modules.map(async (module) => {
        const teacher = await User.findById(module.teacherId);
        return {
          ...module.toObject(),
          teacher: `${teacher.firstName} ${teacher.lastName}`,
          teacherPfp: teacher.pfp,
          id: module._id,
        };
      })
    );

    return NextResponse.json({ modules }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the modules." },
      { status: 500 }
    );
  }
}
