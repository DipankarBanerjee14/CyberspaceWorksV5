

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Cart } from "@/lib/models/Cart";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const {
      userId,
      productId,
      productName,
      productPrice,
      quantity,
    } = await req.json();

    if (
      !userId ||
      !productId ||
      !productName ||
      !productPrice
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const qty = Number(quantity || 1);

    const existingCart = await Cart.findOne({
      userId,
      productId,
    } as any);

    if (existingCart) {
      existingCart.quantity += qty;

      existingCart.totalPrice =
        existingCart.productPrice *
        existingCart.quantity;

      await existingCart.save();

      return NextResponse.json({
        success: true,
        action: "updated",
        cart: existingCart,
      });
    }

    const cart = await Cart.create({
      userId,
      productId,
      productName,
      productPrice,
      quantity: qty,
      totalPrice: productPrice * qty,
    });

    return NextResponse.json({
      success: true,
      action: "created",
      cart,
    });
  } catch (error) {
    console.error("Cart Error:", error);

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
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required",
        },
        { status: 400 }
      );
    }

    const cart = await Cart.find({
      userId,
    } as any).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      cart,
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
export async function DELETE(req: Request) {
  try {
    console.log("Received DELETE request for cart item");
    const { userId, productId } = await req.json();

    await Cart.findOneAndDelete({
      userId,
      productId,
    } as any);

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Failed to remove item",
      },
      { status: 500 }
    );
  }
}