import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function GET(req, { params }) {
  // console.log("GET /api/teachers", params);
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

    const teacher = await User.findOne({ role: "teacher", _id: params.id })
      .select(
        "-password -bahbah -modules -notifications -updatedAt -createdAt -username -role -isAdmin -className -classId -parentName -abcense -__v"
      )
      .lean()
      .exec();

    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found." },
        { status: 404 }
      );
    }

    const transformedTeacher = {
      ...teacher,
      id: teacher._id,
      _id: undefined,
    };

    return NextResponse.json({ teacher: transformedTeacher }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teacher:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the teacher." },
      { status: 500 }
    );
  }
}
