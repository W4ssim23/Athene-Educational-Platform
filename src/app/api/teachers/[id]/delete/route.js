import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { message: "No user ID provided." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const result = await User.deleteOne({ _id: userId, role: "teacher" });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "User not found or not a teacher." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the user." },
      { status: 500 }
    );
  }
}
