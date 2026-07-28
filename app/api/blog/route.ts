import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function GET() {
  try {
    await connectToDatabase();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}