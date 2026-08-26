import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      services,
      requirement,
      source,
    } = body;

    // Basic validation
    if (!name || !email || !phone || !requirement) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, phone and requirement are required.",
        },
        { status: 400 }
      );
    }

    const serviceList = Array.isArray(services)
      ? services.join(", ")
      : services;

    // 1. Send enquiry to admin
    await transporter.sendMail({
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Quick Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Quick Enquiry</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Services:</strong> ${serviceList}</p>
          <p><strong>Requirement:</strong> ${requirement}</p>
          <p><strong>Source:</strong> ${source || "quick-enquiry"}</p>
        </div>
      `,
    });
    console.log("mail send ");

    // 2. Send confirmation email to customer
    await transporter.sendMail({
      from: `"CYBERSPACE WORKS" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for your enquiry",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank You, ${name}!</h2>

          <p>
            We have successfully received your enquiry.
          </p>

          <p>
            Our team will review your requirement and get back to you shortly.
          </p>

          <h3>Your Enquiry Details</h3>

          <p><strong>Service:</strong> ${serviceList}</p>

          <p><strong>Requirement:</strong> ${requirement}</p>

          <br />

          <p>
            Regards,<br />
            <strong>Your Company Name</strong>
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted and emails sent successfully.",
    });
  } catch (error) {
    console.error("Email error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send enquiry.",
      },
      { status: 500 }
    );
  }
}