import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";

export async function POST(req) {
  const encryptionKey = process.env.INCRYPT_SECRET;
  try {
    const students = await req.json();

    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    const addedStudents = [];

    for (const student of students) {
      const {
        firstName,
        lastName,
        parentName,
        address,
        phone,
        email,
        grade,
        className,
        gender,
      } = student;

      if (
        !firstName ||
        !lastName ||
        !parentName ||
        !address ||
        !phone ||
        !email ||
        !grade ||
        !className ||
        !gender
      ) {
        return NextResponse.json(
          { message: "All fields are required for each student." },
          { status: 400 }
        );
      }

      // Ensure phone is a string
      const phoneStr = String(phone);

      const username = `${firstName[0]}_${lastName}${phoneStr.slice(-4)}`;
      console.log("Generated username:", username);

      // Connect to MongoDB
      await connectMongoDB();

      // Check if user already exists
      const duplicate = await User.findOne({ username }).lean().exec();

      if (duplicate) {
        return NextResponse.json(
          { message: `Duplicate username for student: ${username}` },
          { status: 409 }
        );
      }

      // Check for the class
      let ClassModel;
      if (grade === "lycee") {
        ClassModel = Lycee;
      } else if (grade === "cem") {
        ClassModel = Cem;
      } else if (grade === "prm") {
        ClassModel = Primaire;
      }

      const classData = await ClassModel.findOne({
        "classes.name": className.toLowerCase(),
      });

      if (!classData) {
        return NextResponse.json(
          { message: `Class ${className} not found.` },
          { status: 404 }
        );
      }

      const classId = classData._id;

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
        parentName,
        email,
        address,
        phone: phoneStr,
        grade,
        gender,
        className: className,
        classId: classId,
        password: hashedPassword,
        bahbah: encryptedPassword,
        role: "student",
        isAdmin: false,
        pfp: "",
        notifications: [],
      });

      const newStudent = {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        grade: newUser.grade,
        className: newUser.className,
        classId: newUser.classId,
        parentName: newUser.parentName,
        address: newUser.address,
        pfp: newUser.pfp,
        gender: newUser.gender,
      };

      // Adding to new students
      addedStudents.push(newStudent);
    }

    return NextResponse.json(
      { message: "Students registered successfully.", students: addedStudents },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the students." },
      { status: 500 }
    );
  }
}
