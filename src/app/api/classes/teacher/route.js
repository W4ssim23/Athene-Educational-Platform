import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
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

    const { searchParams } = new URL(req.url);
    const teacherId = searchParams.get("id");

    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required." },
        { status: 400 }
      );
    }

    // Fetch classes from all grades where the teacherId matches
    const lyceeClasses = await Lycee.find({
      "classes.modules.teacherId": teacherId,
    });
    const cemClasses = await Cem.find({
      "classes.modules.teacherId": teacherId,
    });
    const primaireClasses = await Primaire.find({
      "classes.modules.teacherId": teacherId,
    });

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
          cls.modules.forEach((mod) => {
            if (mod.teacherId === teacherId) {
              classesByGrade[grade].push({
                className: cls.name,
                classId: cls._id,
                year: cls.year,
                grade: cls.grade,
                number: cls.number,
              });
            }
          });
        });
      });
    };

    // Process each grade
    processClasses(lyceeClasses, "lycee");
    processClasses(cemClasses, "cem");
    processClasses(primaireClasses, "primaire");

    // Function to remove duplicate classes by classId
    const filterUniqueClasses = (classes) => {
      const uniqueClasses = new Map();
      classes.forEach((cls) => {
        if (!uniqueClasses.has(cls.classId)) {
          uniqueClasses.set(cls.classId, cls);
        }
      });
      return Array.from(uniqueClasses.values());
    };

    // Filter duplicates for each grade
    classesByGrade.lycee = filterUniqueClasses(classesByGrade.lycee);
    classesByGrade.cem = filterUniqueClasses(classesByGrade.cem);
    classesByGrade.primaire = filterUniqueClasses(classesByGrade.primaire);

    return NextResponse.json({ classes: classesByGrade }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the classes." },
      { status: 500 }
    );
  }
}
