import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
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

    const { grade } = params;

    if (!grade) {
      return NextResponse.json(
        { message: "No grade provided!" },
        { status: 400 }
      );
    }

    let classes;
    switch (grade.toLowerCase()) {
      case "lycee":
        classes = await Lycee.find({});
        break;
      case "cem":
        classes = await Cem.find({});
        break;
      case "primaire":
        classes = await Primaire.find({});
        break;
      default:
        return NextResponse.json(
          { message: "Invalid grade provided!" },
          { status: 400 }
        );
    }

    // Initialize the result array with empty arrays for each year
    const classesByYear = [[], [], [], [], []];

    // Flatten the results and group by year
    classes.forEach((level) => {
      level.classes.forEach((cls) => {
        if (cls.year - 1 >= 0 && cls.year - 1 < classesByYear.length) {
          classesByYear[cls.year - 1].push({
            name: cls.name,
            id: cls.id,
            grade: cls.grade,
            number: cls.number,
            year: cls.year,
          });
        }
      });
    });

    // console.log(classesByYear);

    return NextResponse.json({ classes: classesByYear }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the classes." },
      { status: 500 }
    );
  }
}
