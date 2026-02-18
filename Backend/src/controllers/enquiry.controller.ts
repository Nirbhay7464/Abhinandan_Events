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
    const { name, email, phone, eventType, message } = req.body as {
      name: string;
      email: string;
      phone?: string;
      eventType?: string;
      message: string;
    };

    // ✅ Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    const trimmedPhone = phone?.trim() || null;
    const trimmedEventType = eventType?.trim() || null;

    // ✅ Save to DB
    await db.insert(enquiries).values({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      eventType: trimmedEventType,
      message: trimmedMessage,
    });

    // ✅ Send notifications (non-blocking safe)
    Promise.all([
      sendEmailNotification({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone ?? undefined,
        message: trimmedMessage,
      }),
      sendWhatsAppNotification({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone ?? undefined,
        message: trimmedMessage,
      }),
    ]).catch((err) => {
      console.error("⚠️ Notification error:", err);
    });

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

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("❌ Get enquiries error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
};
