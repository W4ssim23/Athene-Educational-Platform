import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";

export async function GET(req, { params }) {
  try {
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

    const result = await ClassModel.findOne(
      { "classes._id": classId, "classes.modules._id": moduleId },
      { "classes.$": 1 }
    );

    if (!result) {
      return NextResponse.json(
        { message: "Class or module not found!" },
        { status: 404 }
      );
    }

    const module = result.classes[0].modules.find(
      (mod) => mod._id.toString() === moduleId
    );

    if (!module) {
      return NextResponse.json(
        { message: "Module not found!" },
        { status: 404 }
      );
    }

    const programLink = module.program;

    return NextResponse.json(
      {
        message: "Program link retrieved successfully!",
        programLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get program link error:", error);
    return NextResponse.json(
      { message: "An error occurred while retrieving the program link." },
      { status: 500 }
    );
  }
}
