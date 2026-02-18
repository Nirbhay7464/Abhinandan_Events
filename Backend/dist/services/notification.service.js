"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppNotification = exports.sendEmailNotification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const twilio_1 = __importDefault(require("twilio"));
/* ===============================
   EMAIL NOTIFICATION
=============================== */
const sendEmailNotification = async ({ name, email, phone, message, }) => {
    try {
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;
        if (!emailUser || !emailPass) {
            throw new Error("Email credentials missing in environment variables");
        }
        const transporter = nodemailer_1.default.createTransport({
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
    }
    catch (error) {
        console.error("❌ Email failed:", error);
    }
};
exports.sendEmailNotification = sendEmailNotification;
/* ===============================
   WHATSAPP NOTIFICATION
=============================== */
const sendWhatsAppNotification = async ({ name, email, phone, message, }) => {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
        const toNumber = process.env.ADMIN_WHATSAPP_NUMBER;
        if (!accountSid || !authToken || !fromNumber || !toNumber) {
            throw new Error("Twilio credentials missing in environment variables");
        }
        const client = (0, twilio_1.default)(accountSid, authToken);
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
    }
    catch (error) {
        console.error("❌ WhatsApp failed:", error);
    }
};
exports.sendWhatsAppNotification = sendWhatsAppNotification;
