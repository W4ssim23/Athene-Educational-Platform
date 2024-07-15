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

    await connectMongoDB();

    let students;

    if (search && search !== "") {
      const searchRegex = new RegExp(search, "i"); // 'i' for case-insensitive
      students = await User.find({
        role: "student",
        $or: [
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
        ],
      })
        .select(
          "-password -bahbah -notifications -modules -classes -updatedAt -createdAt -username -role -isAdmin -about -__v"
        )
        .lean()
        .exec();
    } else {
      students = await User.find({ role: "student" })
        .select(
          "-password -bahbah -notifications -modules -classes -updatedAt -createdAt -username -role -isAdmin -about -__v"
        )
        .lean()
        .exec();
    }

    // Transform each student to include id instead of _id
    const transformedStudents = students.map((student) => ({
      ...student,
      id: student._id,
      _id: undefined, // Remove _id field
    }));

    return NextResponse.json(
      { students: transformedStudents },
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
