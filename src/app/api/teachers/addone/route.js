import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

export async function POST(req) {
  const encryptionKey = process.env.INCRYPT_SECRET;
  try {
    const { firstName, lastName, address, phone, email, speciality } =
      await req.json();

    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    if (
      !firstName ||
      !lastName ||
      !address ||
      !phone ||
      !email ||
      !speciality
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const username = `${firstName[0]}_${lastName}${phone.slice(-4)}`;
    console.log("Generated username:", username);

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

    const password = Math.random().toString(36).slice(-8);
    console.log("Generated password", password);

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      encryptionKey
    ).toString();

    const newUser = await User.create({
      username,
      firstName,
      lastName,
      email,
      address,
      phone,
      speciality,
      password: hashedPassword,
      bahbah: encryptedPassword,
      role: "teacher",
      isAdmin: false,
      pfp: "",
      classes: [],
    });

    console.log("User created:", newUser);

    const newTeacher = {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
      speciality: newUser.speciality,
      pfp: newUser.pfp,
      classes: newUser.classes,
      about: newUser.about,
    };

    return NextResponse.json(
      { message: "Teacher registered successfully.", teacher: newTeacher },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the Teacher." },
      { status: 500 }
    );
  }
}
