// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { authOptions } from "@/lib/auth-options";
// import { Wishlist } from "@/lib/models/Wishlist";

// export async function POST(req: Request) {
//   try {
//     await connectToDatabase();
//     const session = await getServerSession(authOptions as any);

//     // 🛡️ SAFE JSON PARSE
//     const body = await req.json().catch(() => null);

//     if (!body) {
//       return NextResponse.json(
//         { success: false, message: "Invalid JSON body" },
//         { status: 400 }
//       );
//     }

//     const { userId, productId } = body;
//     const resolvedUserId = (session as any)?.user?.id || userId;

//     if (!resolvedUserId || !productId) {
//       return NextResponse.json(
//         { success: false, message: "Missing userId or productId" },
//         { status: 400 }
//       );
//     }

//     // check existing wishlist item
//     const existing = await Wishlist.findOne({
//       userId: String(resolvedUserId),
//       productId: String(productId),
//     } as any);

//     // REMOVE if exists
//     if (existing) {
//       await Wishlist.deleteOne({ _id: existing._id });

//       return NextResponse.json({
//         success: true,
//         wishlisted: false,
//         message: "Removed from wishlist",
//       });
//     }

//     // ADD if not exists
//     await Wishlist.create({
//       userId: String(resolvedUserId),
//       productId: String(productId),
//     });

//     return NextResponse.json({
//       success: true,
//       wishlisted: true,
//       message: "Added to wishlist",
//     });
//   } catch (error) {
//     console.error("Wishlist API Error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import  Wishlist  from "@/lib/models/Wishlist";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";



export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const {
      userId,
      productId,
      productName,
      productPrice,
    } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing fields",
        },
        { status: 400 }
      );
    }

    const existing = await Wishlist.findOne({
      userId,
      productId,
    });

    if (existing) {
      existing.isActive = !existing.isActive;
      await existing.save();

      return NextResponse.json({
        success: true,
        wishlist: existing,
      });
    }

    const wishlist = await Wishlist.create({
      userId,
      productId,
      productName,
      productPrice,
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const items = await Wishlist.find({ userId });

  return NextResponse.json({
    success: true,
    wishlist: items,
  });
}