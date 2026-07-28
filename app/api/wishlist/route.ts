// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import Wishlist from "../../../lib/models/Wishlist";

// export async function GET() {
//   try {
//     await connectToDatabase();

//     const wishlist = await Wishlist.find({})
//       .sort({ createdAt: -1 })
//       .lean();

//     return NextResponse.json({
//       success: true,
//       wishlist,
//     });
//   } catch (error) {
//     console.error("Wishlist GET error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to fetch wishlist",
//       },
//       { status: 500 }
//     );
//   }
// }
// export async function DELETE(req: NextRequest) {
//   try {
//     await connectToDatabase();

//     const body = await req.json();
//     const { userId, productId } = body;

//     if (!userId || !productId) {
//       return NextResponse.json(
//         { success: false, message: "userId and productId required" },
//         { status: 400 }
//       );
//     }

//     await Wishlist.findOneAndDelete({ userId, productId });

//     // ✅ Always return JSON
//     return NextResponse.json(
//       { success: true, message: "Removed from wishlist" },
//       { status: 200 }
//     );

//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Wishlist from "../../../lib/models/Wishlist";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const userId =
      req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId required",
        },
        { status: 400 }
      );
    }

    const wishlist = await Wishlist.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error("Wishlist GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch wishlist",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId and productId required",
        },
        { status: 400 }
      );
    }

    await Wishlist.findOneAndDelete({
      userId,
      productId,
    });

    return NextResponse.json({
      success: true,
      message: "Removed from wishlist",
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