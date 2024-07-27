import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user || user.role !== "student") {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const { grade, classId, moduleId, coureseId } = params;
    const { comment } = await req.json();

    console.log("Comment data:", {
      grade,
      classId,
      moduleId,
      coureseId,
      comment,
    });

    if (!grade || !classId || !moduleId || !coureseId || !comment) {
      return NextResponse.json(
        { message: "Not enough data provided!" },
        { status: 400 }
      );
    }

    let ClassModel;
    switch (grade.toLowerCase()) {
      case "lycee":
        ClassModel = Lycee;
        break;
      case "cem":
        ClassModel = Cem;
        break;
      case "primaire":
        ClassModel = Primaire;
        break;
      default:
        return NextResponse.json(
          { message: "Invalid grade provided!" },
          { status: 400 }
        );
    }

    const newComment = {
      student: {
        name: user.firstName + " " + user.lastName,
        pfp: user.pfp,
        id: user.id,
      },
      comment: comment,
    };

    const updateResult = await ClassModel.updateOne(
      {
        "classes._id": classId,
        "classes.modules._id": moduleId,
        "classes.modules.courses._id": coureseId,
      },
      {
        $push: {
          "classes.$[class].modules.$[module].courses.$[course].comments":
            newComment,
        },
      },
      {
        arrayFilters: [
          { "class._id": classId },
          { "module._id": moduleId },
          { "course._id": coureseId },
        ],
      }
    );

    if (updateResult.nModified === 0) {
      return NextResponse.json(
        { message: "Failed to add comment!" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Comment added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the comment." },
      { status: 500 }
    );
  }
}
