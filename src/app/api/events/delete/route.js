import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Event } from "@/app/lib/models/Events";
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

    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json(
        { message: "No event ID provided." },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const result = await Event.deleteOne({ _id: eventId });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the event." },
      { status: 500 }
    );
  }
}
