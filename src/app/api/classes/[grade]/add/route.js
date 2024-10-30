import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//should send the data of the new class

export async function POST(req, { params }) {
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
    const { year } = await req.json();

    if (!grade) {
      return NextResponse.json(
        { message: "No grade provided!" },
        { status: 400 }
      );
    }

    if (!year) {
      return NextResponse.json(
        { message: "No year provided!" },
        { status: 400 }
      );
    }

    let Model;
    let letter;
    switch (grade.toLowerCase()) {
      case "lycee":
        Model = Lycee;
        letter = "s";
        break;
      case "cem":
        Model = Cem;
        letter = "m";
        break;
      case "primaire":
        Model = Primaire;
        letter = "p";
        break;
      default:
        return NextResponse.json(
          { message: "Invalid grade provided!" },
          { status: 400 }
        );
    }

    let level = await Model.findOne({});
    if (!level) {
      // Create a new level if it doesn't exist
      level = new Model({ classes: [] });
    }

    // Filter classes by the specified year
    const classYear = year === "prepa" ? 0 : parseInt(year);
    let existingClasses = level.classes.filter((cls) => {
      //   console.log(cls.year == year);
      return cls.year == classYear;
    });
    // console.log(existingClasses);
    // console.log(existingClasses.length);
    const number = existingClasses.length + 1;
    const name = `${classYear}${letter}${number}`;

    const newClass = {
      name,
      grade,
      year: classYear,
      number,
      modules: [],
      students: [],
    };

    // console.log(newClass);

    level.classes.push(newClass);
    await level.save();

    // console.log(level.classes[level.classes.length - 1]._id);

    return NextResponse.json(
      {
        message: "Class added successfully!",
        classs: {
          name: newClass.name,
          id: level.classes[level.classes.length - 1]._id,
          grade: newClass.grade,
          number: newClass.number,
          year: newClass.year,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Add class error:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the class." },
      { status: 500 }
    );
  }
}
