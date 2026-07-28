import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import cloudinary from "@/lib/Cloudinary";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const keywords = formData.get("keywords") as string;
    const permalink = formData.get("permalink") as string;
    const schema = formData.get("schema") as string;

    let imageUrl = "";

    const image = formData.get("image") as File;

    if (image) {
      const bytes = await image.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const base64 = buffer.toString("base64");

      const dataURI =
        `data:${image.type};base64,${base64}`;

      const upload = await cloudinary.uploader.upload(
        dataURI,
        {
          folder: "blogs",
        }
      );

      imageUrl = upload.secure_url;
    }

    // Cast filter to any to avoid TypeScript strictness on unknown fields
    const existing = await Blog.findOne({
      permalink,
    } as any);

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Permalink already exists",
        },
        {
          status: 409,
        }
      );
    }

    const blog = await Blog.create({
      title,
      content,
      image: imageUrl,
      metaTitle,
      metaDescription,
      keywords: keywords
        ?.split(",")
        .map((k) => k.trim()),

      permalink,

      schema: schema
        ? JSON.parse(schema)
        : {},
    });

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}