import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import User from "@/app/lib/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
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

    const data = await req.json();

    const { name, teacherId } = data;

    if (!name || !teacherId) {
      return NextResponse.json(
        { message: "Incomplete module data provided!" },
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

    const classData = await ClassModel.findOne({ "classes._id": classId });

    if (!classData) {
      return NextResponse.json(
        { message: "Class not found!" },
        { status: 404 }
      );
    }

    const cls = classData.classes.id(classId);

    const newModule = {
      name,
      teacherId,
    };

    cls.modules.push(newModule);
    await classData.save();

    const addedModule = cls.modules[cls.modules.length - 1];

    const teacher = await User.findById(addedModule.teacherId);

    // Add the class name to the teacher's list of classes
    teacher.classes = teacher.classes || [];
    teacher.classes.push(cls.name);
    await teacher.save();

    return NextResponse.json(
      {
        message: "Module added successfully!",
        module: {
          id: addedModule._id,
          name: addedModule.name,
          teacher: `${teacher.firstName} ${teacher.lastName}`,
          teacherPfp: teacher.pfp,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding module:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the module." },
      { status: 500 }
    );
  }
}
