import { Request, Response } from "express";
import { db } from "../db";
import { enquiries } from "../db/schema";
import { desc } from "drizzle-orm";
import {
  sendEmailNotification,
  sendWhatsAppNotification,
} from "../services/notification.service";

/* ===============================
   PUBLIC – Submit Enquiry
=============================== */
export const submitEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, eventType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // ✅ Save to DB
    await db.insert(enquiries).values({
      name: name.trim(),
      email: email.trim(),
      phone: phone || null,
      eventType: eventType || null,
      message: message.trim(),
    });

    // ✅ Send notifications (non-blocking)
    await Promise.all([
      sendEmailNotification(name, email, phone, message),
      sendWhatsAppNotification(name, email, phone, message),
    ]);

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });
  } catch (error) {
    console.error("❌ Submit enquiry error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};

/* ===============================
   ADMIN – Get All Enquiries
=============================== */
export const getAllEnquiries = async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt));

    return res.json(data);
  } catch (error) {
    console.error("❌ Get enquiries error:", error);
    return res.status(500).json({
      message: "Failed to fetch enquiries",
    });
  }
};
