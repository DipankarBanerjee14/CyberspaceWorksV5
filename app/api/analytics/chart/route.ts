import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Purchase from "@/lib/models/Purchase";

export async function GET() {
  try {
    await connectToDatabase();

    const purchases = await (Purchase as any).find({}).sort({
      createdAt: 1,
    });

    // Existing analytics calculations...
    const totalSales = purchases.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const totalOrders = purchases.length;

    const uniqueCustomers = new Set(
      purchases.map((item) => item.userId)
    ).size;

    const averageOrder =
      totalOrders > 0
        ? totalSales / totalOrders
        : 0;

    // Chart Data
    const salesMap: Record<string, number> = {};

    purchases.forEach((purchase) => {
      const date = new Date(purchase.createdAt);

      const key = date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      salesMap[key] =
        (salesMap[key] || 0) +
        Number(purchase.amount || 0);
    });

    const chartData = Object.entries(salesMap).map(
      ([date, sales]) => ({
        date,
        sales,
      })
    );

    return NextResponse.json({
      success: true,

      totalSales,
      totalOrders,
      uniqueCustomers,
      averageOrder,

      salesGrowth: 0,
      orderGrowth: 0,
      customerGrowth: 0,
      avgGrowth: 0,

      chartData,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}