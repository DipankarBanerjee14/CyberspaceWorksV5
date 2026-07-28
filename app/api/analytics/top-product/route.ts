import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";
import Purchase from "../../../../lib/models/Purchase";

export async function GET() {
  try {
    await connectToDatabase();

    const purchases = await Purchase.find({
      status: "paid",
    } as any);

    const productMap: Record<
      string,
      {
        name: string;
        sales: number;
        revenue: number;
      }
    > = {};

    purchases.forEach((purchase) => {
      const productName = purchase.productName || "Unknown";

      if (!productMap[productName]) {
        productMap[productName] = {
          name: productName,
          sales: 0,
          revenue: 0,
        };
      }

      productMap[productName].sales += 1;
      productMap[productName].revenue += Number(
        purchase.productPrice || 0
      );
    });

    const products = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 3);

    const totalRevenue = products.reduce(
      (sum, product) => sum + product.revenue,
      0
    );

    const topProducts = products.map((product) => ({
      ...product,
      share:
        totalRevenue > 0
          ? Number(
              ((product.revenue / totalRevenue) * 100).toFixed(1)
            )
          : 0,
    }));

    return NextResponse.json({
      success: true,
      products: topProducts,
    });
  } catch (error) {
    console.error("Top Products Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch top products",
      },
      {
        status: 500,
      }
    );
  }
}