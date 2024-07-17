import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoDB } from "@/app/lib/mongodb";

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

    const teacher = {
      firstName: "prenom",
      lastName: "nom",
      email: "exmpl@fake.com",
      phone: "0000000000",
      address: "annaba ....",
      speciality: "Primaire/Cem/Lycee",
    };

    //xlxx logic:
    const worksheet = XLSX.utils.json_to_sheet([teacher]);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "MySheet");

    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="teacher_exmpl.xlsx"`,
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
