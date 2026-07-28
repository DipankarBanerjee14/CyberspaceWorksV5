// // models/Cart.ts
// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true },
//     productId: { type: String, required: true },
//     quantity: { type: Number, default: 1 },
//   },
//   { timestamps: true }
// );

// cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

// export const Cart =
//   mongoose.models.Cart || mongoose.model("Cart", cartSchema);


import mongoose, { Schema, models, model } from "mongoose";

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    productId: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart =
  models.Cart || model("Cart", CartSchema);