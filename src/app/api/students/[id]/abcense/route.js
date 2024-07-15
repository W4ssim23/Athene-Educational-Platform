import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function POST(req, param) {
  //   console.log("param", param);
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    const studentId = param.params.id;
    // console.log("studentId", studentId);
    const { date } = await req.json();
    // console.log("date", date);

    if (!date || !studentId) {
      return NextResponse.json(
        { message: "Missing date or student ID." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const studentRecord = await User.findById(studentId);
    if (!studentRecord) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    studentRecord.abcense.push(new Date(date));
    await studentRecord.save();

    return NextResponse.json(studentRecord, { status: 200 });
  } catch (error) {
    console.error("Error adding absence:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the absence." },
      { status: 500 }
    );
  }
}

export async function DELETE(req, param) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    const studentId = param.params.id;
    const { date } = await req.json();

    if (!date || !studentId) {
      return NextResponse.json(
        { message: "Missing date or student ID." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const studentRecord = await User.findById(studentId);
    if (!studentRecord) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    const dateToRemove = new Date(date);
    studentRecord.abcense = studentRecord.abcense.filter(
      (absence) => absence.getTime() !== dateToRemove.getTime()
    );
    await studentRecord.save();

    return NextResponse.json(studentRecord, { status: 200 });
  } catch (error) {
    console.error("Error deleting absence:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the absence." },
      { status: 500 }
    );
  }
}
