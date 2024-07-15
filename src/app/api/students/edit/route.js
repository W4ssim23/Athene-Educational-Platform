import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { filterEmptyValues } from "@/lib";
import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    const resdata = await req.json();

    if (Object.keys(filterEmptyValues(resdata)).length === 0) {
      return NextResponse.json(
        { message: "No data provided!" },
        { status: 400 }
      );
    }

    if (!resdata.id) {
      return NextResponse.json(
        { message: "No user ID provided!" },
        { status: 400 }
      );
    }

    if (user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    const data = filterEmptyValues(resdata);

    await connectMongoDB();

    const updatedUser = await User.findByIdAndUpdate(
      resdata.id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Student not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Student profile updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "An error occurred while editing the student profile." },
      { status: 500 }
    );
  }
}
