// models/Purchase.js

import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userId: String,
    userName: String,
    userEmail: String,

    productId: String,
    productName: String,
    productPrice: Number,

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,

    status: {
      type: String,
      default: "paid",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", purchaseSchema);