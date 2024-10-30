import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/lib/models/User";
import { connectMongoDB } from "@/app/lib/mongodb";

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

    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;

    await connectMongoDB();

    let students;
    const query = { role: "student" };

    if (search && search !== "") {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: searchRegex,
            },
          },
        },
      ];
    }

    students = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .select(
        "-password -bahbah -notifications -modules -classes -updatedAt -createdAt -username -role -isAdmin -about -__v"
      )
      .lean()
      .exec();

    const totalStudents = await User.countDocuments(query);

    return NextResponse.json(
      { students, total: totalStudents, page, limit },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the students." },
      { status: 500 }
    );
  }
}
