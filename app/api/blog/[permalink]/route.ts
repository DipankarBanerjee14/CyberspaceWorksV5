import { NextResponse } from "next/server";
import Blog from "@/lib/models/Blog";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ permalink: string }> }
) {
  try {
    await connectToDatabase();

    const { permalink } = await params;

    // Cast filter to any to avoid TypeScript strictness on unknown fields
    const blog = await Blog.findOne({
      permalink,
    } as any);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog,
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