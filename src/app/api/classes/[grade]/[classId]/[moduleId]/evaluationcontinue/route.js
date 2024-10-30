import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/User";

import * as XLSX from "xlsx";

// this link will download fo the teacher an execl file with the names of the students and the latest
// evaluation notes out of the 31 notes ,
// guess i have to add the notes in the datbase to the module and then get them here
// there would be parres of the student id and a list of its notes
// the teacher can then fill the notes and upload the file again to update the notes

export async function GET(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "teacher") {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const { classId } = params;

    const students = await User.find({ classId, role: "student" });

    if (!students.length) {
      return NextResponse.json(
        { message: "No students found for this class." },
        { status: 404 }
      );
    }

    const studentData = students.map((student) => ({
      name: `${student.firstName} ${student.lastName}`,
      note: "",
      remarque: "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(studentData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="students_${classId}.xlsx"`,
        "Content-Type": "application/vnd.ms-excel",
      },
    });
  } catch (error) {
    console.error("Error creating file:", error);
    return NextResponse.json(
      { message: "An error occurred while sending the file." },
      { status: 500 }
    );
  }
}
