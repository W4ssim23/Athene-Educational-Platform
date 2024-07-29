import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb";
import { Lycee, Cem, Primaire } from "@/app/lib/models/Grades";
import User from "@/app/lib/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    const { user } = session;

    if (!user) {
      return NextResponse.json(
        { message: "You are not authorized to perform this action." },
        { status: 401 }
      );
    }

    await connectMongoDB();

    const userData = await User.findById(user.id);

    if (!userData) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search");

    let rooms = [];
    let roomsId = [];

    if (userData.role === "admin") {
      const grades = [Lycee, Cem, Primaire];
      for (const GradeModel of grades) {
        const gradeData = await GradeModel.find({});
        gradeData.forEach((level) => {
          level.classes.forEach((cls) => {
            cls.modules.forEach((mod) => {
              if (
                !search ||
                mod.name.toLowerCase().includes(search.toLowerCase())
              ) {
                rooms.push(`${cls.name.toUpperCase()} :  ${mod.name}`);
                roomsId.push(
                  `${mod.name}-${cls.name}-chat`
                    .replace(/\s/g, "")
                    .toLowerCase()
                );
              }
            });
          });
        });
      }
    } else if (userData.role === "teacher") {
      for (const grade of ["lycee", "cem", "primaire"]) {
        let ClassModel;
        switch (grade) {
          case "lycee":
            ClassModel = Lycee;
            break;
          case "cem":
            ClassModel = Cem;
            break;
          case "primaire":
            ClassModel = Primaire;
            break;
        }

        const gradeData = await ClassModel.find({});
        gradeData.forEach((level) => {
          level.classes.forEach((cls) => {
            cls.modules.forEach((mod) => {
              if (mod.teacherId === userData.id) {
                if (
                  !search ||
                  mod.name.toLowerCase().includes(search.toLowerCase())
                ) {
                  rooms.push(`${cls.name.toUpperCase()} :  ${mod.name}`);
                  roomsId.push(
                    `${mod.name}-${cls.name}-chat`
                      .replace(/\s/g, "")
                      .toLowerCase()
                  );
                }
              }
            });
          });
        });
      }
    } else if (userData.role === "student") {
      const { grade, classId } = userData;
      let ClassModel;
      switch (grade) {
        case "lycee":
          ClassModel = Lycee;
          break;
        case "cem":
          ClassModel = Cem;
          break;
        case "primaire":
          ClassModel = Primaire;
          break;
      }

      const classData = await ClassModel.findOne(
        { "classes._id": classId },
        { "classes.$": 1 }
      );

      if (classData) {
        const cls = classData.classes[0];
        cls.modules.forEach((mod) => {
          if (
            !search ||
            mod.name.toLowerCase().includes(search.toLowerCase())
          ) {
            rooms.push(`${cls.name.toUpperCase()} :  ${mod.name}`);
            roomsId.push(
              `${mod.name}-${cls.name}-chat`.replace(/\s/g, "").toLowerCase()
            );
          }
        });
      }
    }

    return NextResponse.json({ rooms, roomsId }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the chat rooms." },
      { status: 500 }
    );
  }
}
