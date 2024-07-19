import { Event } from "@/app/lib/models/Events";
import { connectMongoDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (time) => {
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export async function POST(req) {
  try {
    const {
      title,
      date,
      start,
      description,
      eventEnd,
      votes,
      yesVotes,
      noVotes,
    } = await req.json();

    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    if (!title || !date || !start || !description || votes === undefined) {
      return NextResponse.json(
        {
          message:
            "Title, date, start time, description, and votes are required.",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    const newEvent = await Event.create({
      title,
      date,
      start,
      description,
      eventEnd,
      votes,
      yesVotes: yesVotes || [],
      noVotes: noVotes || [],
    });

    const event = {
      id: newEvent._id,
      title: newEvent.title,
      date: formatDate(newEvent.date),
      start: formatTime(newEvent.start),
      description: newEvent.description,
      votes: newEvent.votes,
      votersListYes: newEvent.yesVotes,
      votersListNo: newEvent.noVotes,
      end: newEvent.eventEnd ? formatTime(newEvent.eventEnd) : "",
    };

    console.log("Event created:", event);

    return NextResponse.json(
      { message: "Event added successfully.", event: event },
      { status: 201 }
    );
  } catch (error) {
    console.error("Event creation error:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the event." },
      { status: 500 }
    );
  }
}
