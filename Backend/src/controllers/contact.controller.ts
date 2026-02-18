import { Request, Response } from "express";
import { db } from "../db";
import { enquiries } from "../db/schema";
import { desc } from "drizzle-orm";
import { io } from "../server";

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const inserted = await db
      .insert(enquiries)
      .values({
        name,
        email,
        phone: phone || null,
        message,
      })
      .returning();

    const newContact = inserted[0];

    // 🔔 REAL TIME EMIT
    io.emit("new_contact", newContact);

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to submit contact form" });
  }
};

export const getContacts = async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt));

    return res.json(data);
  } catch {
    return res.status(500).json({ message: "Failed to fetch contacts" });
  }
};
