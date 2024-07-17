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

    let teachers;

    if (search && search !== "") {
      const searchRegex = new RegExp(search, "i");
      teachers = await User.find({
        role: "teacher",
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
          "-password -bahbah -modules -notifications -updatedAt -createdAt -username -role -isAdmin  -className -classId -parentName -abcense -__v"
        )
        .lean()
        .exec();
    } else {
      teachers = await User.find({ role: "teacher" })
        .select(
          "-password -bahbah -modules -notifications -updatedAt -createdAt -username -role -isAdmin  -className -classId -parentName -abcense -__v"
        )
        .lean()
        .exec();
    }

    // Transform each student to include id instead of _id
    const transformedTeachers = teachers.map((teacher) => ({
      ...teacher,
      id: teacher._id,
      _id: undefined,
    }));

    return NextResponse.json(
      { teachers: transformedTeachers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the teachers." },
      { status: 500 }
    );
  }
}
