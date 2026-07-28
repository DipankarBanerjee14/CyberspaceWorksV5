import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    // Mail to customer
    await transporter.sendMail({
      from: process.env.MAIL_USER,

      to: body.email,

      subject: "Order Submitted Successfully",

      html: `
        <div style="font-family:sans-serif">
          <h2>Hello ${body.name}</h2>

          <p>Your order has been submitted successfully.</p>

          <h3>Selected Plan: ${body.planName}</h3>

          <p>We will contact you shortly.</p>
        </div>
      `,
    })

    // Mail to owner
    await transporter.sendMail({
      from: process.env.MAIL_USER,

      to: process.env.OWNER_EMAIL,

      subject: `New ${body.planName} Plan Order`,

      html: `
        <div style="font-family:sans-serif">
          <h2>New Order Received</h2>

          <p><strong>Plan:</strong> ${body.planName}</p>

          <p><strong>Name:</strong> ${body.name}</p>

          <p><strong>Email:</strong> ${body.email}</p>

          <p><strong>Phone:</strong> ${body.phone}</p>

          <p><strong>Business Name:</strong> ${body.businessName}</p>

          <p><strong>Address:</strong> ${body.address}</p>

          <p><strong>Description:</strong> ${body.description}</p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
    })
  } catch (error: any) {
    console.log(error)

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    )
  }
}