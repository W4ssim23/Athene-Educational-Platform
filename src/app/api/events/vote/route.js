// /api/vote.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Event } from "@/app/lib/models/Events";
import { connectMongoDB } from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    const { eventId, voterId, voterName, vote } = await req.json();

    if (!eventId || !voterId || !voterName || !vote) {
      return NextResponse.json(
        { message: "Incomplete voting data provided!" },
        { status: 400 }
      );
    }

    if (user.role !== "student") {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const event = await Event.findById(eventId);

    if (!event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }

    if (vote === "yes") {
      event.yesVotes.push({ name: voterName, id: voterId });
      event.noVotes = event.noVotes.filter((voter) => voter.id !== voterId);
    } else {
      event.noVotes.push({ name: voterName, id: voterId });
      event.yesVotes = event.yesVotes.filter((voter) => voter.id !== voterId);
    }

    await event.save();

    return NextResponse.json(
      { message: "Vote recorded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Voting error:", error);
    return NextResponse.json(
      { message: "An error occurred while recording the vote." },
      { status: 500 }
    );
  }
}
