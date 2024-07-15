import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";

import CryptoJS from "crypto-js";

import * as XLSX from "xlsx";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "admin" || !user.isAdmin) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const students = await User.find({ role: "student" })
      .select(
        "-abcense -pfp -notifications -modules -classes -updatedAt -createdAt  -role -isAdmin -about -__v -_id"
      )
      .lean()
      .exec();

    const encryptionKey = process.env.INCRYPT_SECRET;

    students.forEach((student) => {
      console.log(student.bahbah);
      try {
        const decryptedPassword = CryptoJS.AES.decrypt(
          student.bahbah,
          encryptionKey
        ).toString(CryptoJS.enc.Utf8);
        student.password = decryptedPassword;
        student.bahbah = undefined;
        delete student.bahbah;
      } catch (error) {
        console.error(
          `Error decrypting password for student ${student.username}:`,
          error
        );
        // Handle decryption error, perhaps mark the student record as problematic or skip it
        student.password = "Decryption Error";
      }
    });

    //xlxx logic:
    const worksheet = XLSX.utils.json_to_sheet(students);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "MySheet");

    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="students.xlsx"`,
        "Content-Type": "application/vnd.ms-excel",
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the students." },
      { status: 500 }
    );
  }
}
