import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    // Fetch classes from all grades
    const lyceeClasses = await Lycee.find({});
    const cemClasses = await Cem.find({});
    const primaireClasses = await Primaire.find({});

    // Initialize the result object to group classes by grade
    const classesByGrade = {
      lycee: [],
      cem: [],
      primaire: [],
    };

    // Helper function to process classes
    const processClasses = (classes, grade) => {
      classes.forEach((level) => {
        level.classes.forEach((cls) => {
          classesByGrade[grade].push({
            name: cls.name,
            id: cls._id,
          });
        });
      });
    };

    // Process each grade
    processClasses(lyceeClasses, "lycee");
    processClasses(cemClasses, "cem");
    processClasses(primaireClasses, "primaire");

    return NextResponse.json({ classes: classesByGrade }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the classes." },
      { status: 500 }
    );
  }
}
