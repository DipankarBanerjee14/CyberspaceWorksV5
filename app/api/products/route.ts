
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

// ✅ Cloudinary config (same file as requested)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


// =====================
// ✅ POST - Create Product
// =====================
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const actualPrice = formData.get("actualPrice") as string;
    const discountPrice = formData.get("discountPrice") as string;
    const category = formData.get("category") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const longDescription = formData.get("longDescription") as string;
    const demoLink = formData.get("demoLink") as string;
    const driveLink = formData.get("driveLink") as string;
    const image = formData.get("image") as File | null;

    if (
      !title ||
      !actualPrice ||
      !discountPrice ||
      !category ||
      !shortDescription ||
      !longDescription
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    // ✅ Cloudinary Upload
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const product = await Product.create({
      title,
      actualPrice: Number(actualPrice),
      discountPrice: Number(discountPrice),
      category,
      shortDescription,
      longDescription,
      image: imageUrl,
       demoLink,
       driveLink,
    });

    console.log(product);
    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}


// =====================
// ✅ GET - Fetch Products
// =====================
export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}