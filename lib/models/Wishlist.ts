// import mongoose, { Schema, models, model } from "mongoose";

// const WishlistSchema = new Schema(
//   {
//     userId: {
//       type: String,
//       required: true,
//     },

//     productId: {
//       type: String,
//       required: true,
//     },

//     productName: {
//       type: String,
//       required: true,
//     },

//     productPrice: {
//       type: Number,
//       required: true,
//     },

//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default models.Wishlist ||
//   model("Wishlist", WishlistSchema);

// /lib/models/Wishlist.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWishlist extends Document {
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
  isActive: boolean;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    userId:       { type: String,  required: true },
    productId:    { type: String,  required: true },
    productName:  { type: String,  required: true },
    productPrice: { type: Number,  required: true },
    isActive:     { type: Boolean, default: true  },
  },
  { timestamps: true }
);

const Wishlist: Model<IWishlist> =
  (mongoose.models.Wishlist as Model<IWishlist>) ||
  mongoose.model<IWishlist>("Wishlist", WishlistSchema);

export default Wishlist;