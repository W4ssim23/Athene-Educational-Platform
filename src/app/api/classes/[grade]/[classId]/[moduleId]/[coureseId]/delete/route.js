import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
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
        { message: "Not enough data provided!", provided: params },
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

    // Use updateOne to remove the course from the module's courses array
    const result = await ClassModel.updateOne(
      { "classes._id": classId, "classes.modules._id": moduleId },
      {
        $pull: { "classes.$[cls].modules.$[mod].courses": { _id: coureseId } },
      },
      {
        arrayFilters: [{ "cls._id": classId }, { "mod._id": moduleId }],
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Course not found or already deleted!" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Course deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the course." },
      { status: 500 }
    );
  }
}
