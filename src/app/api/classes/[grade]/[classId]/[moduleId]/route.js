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

    const coursesByType = {
      Cours: [],
      Devoir: [],
      Epreuves: [],
      EvaluationContinue: [],
    };

    mod.courses.forEach((course) => {
      const courseType = course.type.replace(" ", "");
      coursesByType[courseType].push({
        id: course._id,
        courseName: course.name,
        courseDate: course.date.toISOString().split("T")[0],
      });
    });

    return NextResponse.json({ courses: coursesByType }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the courses." },
      { status: 500 }
    );
  }
}
