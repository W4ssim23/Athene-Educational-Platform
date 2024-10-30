import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/lib/models/User";

export async function DELETE(req, { params }) {
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
        { message: "param not provided!" },
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
      { "classes._id": classId, "classes.modules._id": moduleId },
      { "classes.$": 1 }
    );

    const deletedModule = classData?.classes[0]?.modules.find(
      (mod) => mod._id.toString() === moduleId
    );

    if (!deletedModule) {
      return NextResponse.json(
        { message: "Module not found!" },
        { status: 404 }
      );
    }

    const teacherId = deletedModule.teacherId;
    const className = classData?.classes[0]?.name;

    // Step 2: Delete the module from the class
    const result = await ClassModel.findOneAndUpdate(
      { "classes._id": classId },
      { $pull: { "classes.$.modules": { _id: moduleId } } },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ message: "not found!" }, { status: 404 });
    }

    const remainingModules = result.classes
      .find((cls) => cls._id.toString() === classId)
      ?.modules.filter((mod) => mod.teacherId === teacherId);

    if (remainingModules.length === 0) {
      await User.findByIdAndUpdate(
        teacherId,
        { $pull: { classes: className } },
        { new: true }
      );
    }

    return NextResponse.json(
      { message: "Module and class association deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete module error:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the module." },
      { status: 500 }
    );
  }
}
