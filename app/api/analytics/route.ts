import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Purchase from "../../../lib/models/Purchase";

export async function GET() {
  try {
    await connectToDatabase();

    const now = new Date();

    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - 7);

    const previousWeekStart = new Date(now);
    previousWeekStart.setDate(now.getDate() - 14);

    // All purchases
    const purchases = await Purchase.find().lean();

    // Current week
    const currentWeekPurchases = await Purchase.find({
      createdAt: {
        $gte: currentWeekStart,
      },
    } as any).lean();

    // Previous week
    const previousWeekPurchases = await Purchase.find({
      createdAt: {
        $gte: previousWeekStart,
        $lt: currentWeekStart,
      },
    } as any).lean();

    const totalSales = purchases.reduce(
      (sum, item) => sum + item.productPrice,
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

    const currentWeekSales =
      currentWeekPurchases.reduce(
        (sum, item) => sum + item.productPrice,
        0
      );

    const previousWeekSales =
      previousWeekPurchases.reduce(
        (sum, item) => sum + item.productPrice,
        0
      );

    const salesGrowth =
      previousWeekSales === 0
        ? 100
        : (
            ((currentWeekSales -
              previousWeekSales) /
              previousWeekSales) *
            100
          ).toFixed(1);

    const currentWeekOrders =
      currentWeekPurchases.length;

    const previousWeekOrders =
      previousWeekPurchases.length;

    const orderGrowth =
      previousWeekOrders === 0
        ? 100
        : (
            ((currentWeekOrders -
              previousWeekOrders) /
              previousWeekOrders) *
            100
          ).toFixed(1);

    const currentWeekCustomers =
      new Set(
        currentWeekPurchases.map(
          (p) => p.userId
        )
      ).size;

    const previousWeekCustomers =
      new Set(
        previousWeekPurchases.map(
          (p) => p.userId
        )
      ).size;

    const customerGrowth =
      previousWeekCustomers === 0
        ? 100
        : (
            ((currentWeekCustomers -
              previousWeekCustomers) /
              previousWeekCustomers) *
            100
          ).toFixed(1);

    const currentAvg =
      currentWeekOrders > 0
        ? currentWeekSales /
          currentWeekOrders
        : 0;

    const previousAvg =
      previousWeekOrders > 0
        ? previousWeekSales /
          previousWeekOrders
        : 0;

    const avgGrowth =
      previousAvg === 0
        ? 100
        : (
            ((currentAvg -
              previousAvg) /
              previousAvg) *
            100
          ).toFixed(1);


        const monthlySales: Record<string, number> = {};

purchases.forEach((purchase: any) => {
  const date = new Date(purchase.createdAt);

  const month = date.toLocaleString("en-US", {
    month: "short",
  });

  monthlySales[month] =
    (monthlySales[month] || 0) +
    Number(purchase.productPrice);
});

const chartData = Object.entries(monthlySales).map(
  ([month, sales]) => ({
    month,
    sales,
  })
);

    return NextResponse.json({
      success: true,

      totalSales,
      totalOrders,
      uniqueCustomers,
      averageOrder,

      salesGrowth,
      orderGrowth,
      customerGrowth,
      avgGrowth,
      chartData,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}