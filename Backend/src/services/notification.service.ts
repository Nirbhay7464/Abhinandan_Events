import nodemailer from "nodemailer";
import twilio from "twilio";

export const sendEmailNotification = async (message: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // admin receives
      subject: "🚀 New Contact Form Submission",
      text: message,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

export const sendWhatsAppNotification = async (message: string) => {
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: process.env.ADMIN_WHATSAPP_NUMBER,
      body: message,
    });

    console.log("✅ WhatsApp sent successfully");
  } catch (error) {
    console.error("❌ WhatsApp failed:", error);
  }
};
