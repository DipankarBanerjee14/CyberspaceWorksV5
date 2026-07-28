// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectToDatabase } from "@/lib/mongodb";
// import User from "../../../../lib/models/User";

// export async function POST(req) {
//   try {
//     await connectToDatabase();

//     const { name, email, phone, password } = await req.json();

//     if (!name || !email || !phone || !password) {
//       return NextResponse.json(
//         { success: false, message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const existingUser = await User.findOne({
//       email: email.toLowerCase(),
//     } as any);

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: "Email already exists" },
//         { status: 400 }
//       );
//     }

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       phone,
//       passwordHash,
//       role: "visitors", // default role
//       source: "self-signup",
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Account created successfully",
//       userId: user._id,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { name, email, phone, password } =
      await req.json();

    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    } as any);

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      passwordHash,
      role: "visitor",
      source: "self-signup",
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}