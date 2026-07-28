// import mongoose, { Schema, models, model } from "mongoose";

// const productSchema = new Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     actualPrice: { type: Number, required: true, min: 0 },
//     discountPrice: { type: Number, required: true, min: 0 },
//     category: { type: String, required: true, trim: true },
//     shortDescription: { type: String, required: true, maxlength: 200 },
//     longDescription: { type: String, required: true },
//     image: { type: String },
//     demoLink: String,
//     driveLink: { type: String, default: "" },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
//     status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// // ✅ FIX: safe model caching (THIS removes TS conflict)
// const Product = models.Product || model("Product", productSchema);

// export default Product;
// /lib/models/Product.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  actualPrice: number;
  discountPrice: number;
  category: string;
  rating?: number;
  reviewCount?: number;
  demoLink?: string;   // ✅ add this
  driveLink?: string;  // ✅ add this
}

const ProductSchema = new Schema<IProduct>({
  title:            { type: String, required: true },
  image:            { type: String },
  shortDescription: { type: String },
  longDescription:  { type: String },
  actualPrice:      { type: Number, required: true },
  discountPrice:    { type: Number, required: true },
  category:         { type: String },
  rating:           { type: Number, default: 0 },
  reviewCount:      { type: Number, default: 0 },
  demoLink:         { type: String, default: "" }, 
  driveLink:        { type: String, default: "" },  
});

const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;