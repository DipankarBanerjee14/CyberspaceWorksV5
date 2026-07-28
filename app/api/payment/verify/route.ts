// import crypto from "crypto";
// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     user,
//     product,
//   } = body;

//   const generatedSignature = crypto
//     .createHmac(
//       "sha256",
//       process.env.RAZORPAY_KEY_SECRET!
//     )
//     .update(
//       razorpay_order_id +
//         "|" +
//         razorpay_payment_id
//     )
//     .digest("hex");

//   if (
//     generatedSignature !== razorpay_signature
//   ) {
//     return NextResponse.json({
//       success: false,
//     });
//   }

// if (!user || !user.email) {
//   return NextResponse.json(
//     {
//       success: false,
//       error: "User email missing",
//     },
//     { status: 400 }
//   );
// }

// const username =
//   user.email.split("@")[0];

//   const password =
//     Math.random().toString(36).slice(-8);

//   const transporter =
//     nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     console.log(user.email);

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: user.email,
//     subject: "Your Purchase Credentials",

//     html: `
//       <h2>Purchase Successful</h2>

//       <p>Product: ${product.title}</p>

//     //   <p>
//     //   Username:
//     //   <b>${username}</b>
//     //   </p>

//       <p>
//       DriveLink:
//       <b>${product.driveLink}</b>
//       </p>
//     `,
//   });

//   return NextResponse.json({
//     success: true,
//   });
// }


// app/api/payment/verify/route.ts

import crypto from "crypto";
import Purchase from "../../../../lib/models/Purchase";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user,
      product,
    } = body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return Response.json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // Save purchase
    const purchase =
      await Purchase.create({
        userId: user?._id,
        userName: user?.name,
        userEmail: user?.email,

        productId: product?._id,
        productName: product?.title,
        productPrice:
          product?.discountPrice,

        razorpayOrderId:
          razorpay_order_id,
        razorpayPaymentId:
          razorpay_payment_id,
        razorpaySignature:
          razorpay_signature,

        status: "paid",
      });
      console.log(purchase);

    return Response.json({
      success: true,
      purchase,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: error.message,
    });
  }
}