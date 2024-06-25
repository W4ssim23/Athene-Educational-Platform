import User from "../../lib/models/User";
import { connectMongoDB } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    // Parse and validate request body
    const { name, username, password } = await req.json();

    if (!name || !username || !password) {
      return NextResponse.json(
        { message: "All fields (name, username, password) are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Check if user already exists
    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
      return NextResponse.json(
        { message: "Duplicate username" },
        { status: 409 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, username, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
