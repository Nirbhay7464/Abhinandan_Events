import nodemailer from "nodemailer";
import twilio from "twilio";

type NotificationPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

/* ===============================
   EMAIL NOTIFICATION
=============================== */
export const sendEmailNotification = async ({
  name,
  email,
  phone,
  message,
}: NotificationPayload) => {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      throw new Error("Email credentials missing in environment variables");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const formattedMessage = `
New Enquiry Received:

Name: ${name}
Email: ${email}
Phone: ${phone ?? "Not provided"}
Message: ${message}
`;

    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      subject: "🚀 New Contact Form Submission",
      text: formattedMessage,
    });

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email failed:", error);
  }
};

/* ===============================
   WHATSAPP NOTIFICATION
=============================== */
export const sendWhatsAppNotification = async ({
  name,
  email,
  phone,
  message,
}: NotificationPayload) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    const toNumber = process.env.ADMIN_WHATSAPP_NUMBER;

    if (!accountSid || !authToken || !fromNumber || !toNumber) {
      throw new Error("Twilio credentials missing in environment variables");
    }

    const client = twilio(accountSid, authToken);

    const formattedMessage = `
🚀 New Enquiry

Name: ${name}
Email: ${email}
Phone: ${phone ?? "Not provided"}
Message: ${message}
`;

    await client.messages.create({
      from: fromNumber,
      to: toNumber,
      body: formattedMessage,
    });

    console.log("✅ WhatsApp sent successfully");
  } catch (error) {
    console.error("❌ WhatsApp failed:", error);
  }
};
