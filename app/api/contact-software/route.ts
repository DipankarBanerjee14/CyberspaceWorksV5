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

    // Mail to user
    await transporter.sendMail({
      from: process.env.MAIL_USER,

      to: body.email,

      subject: "Message Submitted Successfully",

      html: `
        <h2>Hello ${body.firstName}</h2>

        <p>Your message has been received successfully.</p>

        <p>We will contact you soon.</p>
      `,
    })

    // Mail to owner
    await transporter.sendMail({
      from: process.env.MAIL_USER,

      to: process.env.OWNER_EMAIL,

      subject: "New Contact Form Submission",

      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>

        <p><strong>Email:</strong> ${body.email}</p>

        <p><strong>Subject:</strong> ${body.subject}</p>

        <p><strong>Message:</strong></p>

        <p>${body.message}</p>
      `,
    })

    return NextResponse.json({
      success: true,
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