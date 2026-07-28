// app/api/wishlist/[userId]/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Wishlist from "@/lib/models/Wishlist";

type RouteContext = {
  params: Promise<{
    userId: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: RouteContext
) {
  try {
    await connectToDatabase();

    const { userId } = await params;

    const data = await Wishlist.find({
      userId,
    });

    return NextResponse.json({
      success: true,
      wishlist: data,
    });
  } catch (error) {
    console.error("Wishlist GET Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch wishlist",
      },
      { status: 500 }
    );
  }
}