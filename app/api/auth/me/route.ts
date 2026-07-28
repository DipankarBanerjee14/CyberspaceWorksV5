import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
  try {
    const session = await requireAuth();

if (!session) {
  return NextResponse.json(
    {
      success: false,
      message: "Unauthorized",
    },
    { status: 401 }
  );
}

    await connectToDatabase();

    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not found",
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email } as any)
      .select("_id name email role")
      .lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}