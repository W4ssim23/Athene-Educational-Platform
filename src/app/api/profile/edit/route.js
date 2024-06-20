import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { filterEmptyValues } from "@/lib";
import User from "@/app/models/User";
import { connectMongoDB } from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    const resdata = await req.json();

    if (Object.keys(filterEmptyValues(resdata)).length === 0)
      return NextResponse.json({ message: "No data !" }, { status: 400 });

    if (Object.keys(filterEmptyValues(resdata)).length === 1 && resdata.id)
      return NextResponse.json({ message: "No data !" }, { status: 400 });

    if (!resdata.id)
      return NextResponse.json({ message: "No user id !" }, { status: 400 });

    if (resdata.id !== user.id)
      return NextResponse.json(
        { message: "You are not authorized to edit this profile" },
        { status: 401 }
      );

    const data = filterEmptyValues(resdata);

    // console.log(data);

    await connectMongoDB();

    const updatedUser = await User.findByIdAndUpdate(
      resdata.id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile updated successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "An error occurred while edeting the profile" },
      { status: 500 }
    );
  }
}
