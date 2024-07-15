import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    const { studentIds } = await req.json();

    if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json(
        { message: "No student IDs provided." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const result = await User.deleteMany({
      _id: { $in: studentIds },
      role: "student",
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No students found to delete." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Students deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting students:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the students." },
      { status: 500 }
    );
  }
}
