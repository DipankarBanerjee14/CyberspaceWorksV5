import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Purchase from "@/lib/models/Purchase";

export async function GET() {
  try {
    await connectToDatabase();

    const purchases = await Purchase.find()
      .sort({ createdAt: -1 })
      .lean();

    const orders = purchases.map((purchase: any) => ({
      id: purchase._id.toString(),
      customer: purchase.userName || "Customer",
      email: purchase.userEmail || "",
      product: purchase.productName,
      amount: purchase.productPrice,
      status: purchase.status || "Completed",
      date: purchase.createdAt,
    }));

    console.log(orders);
    return NextResponse.json({
      success: true,
      orders,
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