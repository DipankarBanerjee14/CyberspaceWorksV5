// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import Product from "@/lib/models/Product";
// import mongoose from "mongoose";

// type RouteContext = {
//   params: Promise<{
//     id: string;
//   }>;
// };

// export async function GET(req: Request, { params }: RouteContext) {
//   try {
//     await connectToDatabase();

//     const { id } = await params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid product id" },
//         { status: 400 }
//       );
//     }

//     const product = await Product.findById(id).exec();

//     if (!product) {
//       return NextResponse.json(
//         { success: false, error: "Product not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       product,
//     });
//   } catch (error) {
//     console.error("Product GET Error:", error);

//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import mongoose, { Model, Document } from "mongoose";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(req: Request, { params }: RouteContext) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product id" },
        { status: 400 }
      );
    }

    const product = await (Product as Model<Document>).findById(id).exec();

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Product GET Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}