import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Event } from "@/app/lib/models/Events";
import { connectMongoDB } from "@/app/lib/mongodb";

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

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    const events = await Event.find().lean().exec();

    const transformedEvents = events.map((event) => ({
      id: event._id,
      title: event.title,
      date: formatDate(event.date),
      start: formatTime(event.start),
      description: event.description,
      votes: event.votes,
      votersListYes: event.yesVotes || [],
      votersListNo: event.noVotes || [],
      end: event.eventEnd ? formatTime(event.eventEnd) : "",
    }));

    return NextResponse.json(
      { events: transformedEvents.reverse() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the events." },
      { status: 500 }
    );
  }
}
