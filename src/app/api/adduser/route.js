import User from "../../lib/models/User";
import { connectMongoDB } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// export async function POST(req) {
//   try {
//     // Parse and validate request body
//     const { name, username, password } = await req.json();

//     if (!name || !username || !password) {
//       return NextResponse.json(
//         { message: "All fields (name, username, password) are required." },
//         { status: 400 }
//       );
//     }

//     // Connect to MongoDB
//     await connectMongoDB();

//     // Check if user already exists
//     const duplicate = await User.findOne({ username }).lean().exec();

//     if (duplicate) {
//       return NextResponse.json(
//         { message: "Duplicate username" },
//         { status: 409 }
//       );
//     }

//     // Hash password and create user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ name, username, password: hashedPassword });

//     return NextResponse.json(
//       { message: "User registered successfully." },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json(
//       { message: "An error occurred while registering the user." },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Check if the admin user already exists
    // const adminUser = await User.findOne({ username: "admin" }).lean().exec();

    // if (!adminUser) {
    console.log("Admin user not found. Creating admin user...");
    // Hash password and create admin user if it doesn't exist
    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({
      firstName: "Admin",
      lastName: "User",
      username: "admin2",
      password: hashedPassword,
      role: "admin",
      isAdmin: true,
      pfp: "https://pagesix.com/wp-content/uploads/sites/3/2019/04/gettyimages-1076483808.jpg?quality=75&strip=all",
      classes: ["1s1", "1m1", "1p1"],
    });

    return NextResponse.json({
      success: true,
      resultt: "usercreated",
    });
    // }

    return NextResponse.json(
      { message: "Admin user already exists." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating admin user:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the admin user." },
      { status: 500 }
    );
  }
}
