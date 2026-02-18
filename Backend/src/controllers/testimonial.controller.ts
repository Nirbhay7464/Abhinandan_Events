import { Request, Response } from "express";
import { db } from "../db";
import { testimonials } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { io } from "../server";

/* ===============================
   PUBLIC – GET APPROVED
=============================== */
export const getTestimonials = async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(desc(testimonials.createdAt));

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

/* ===============================
   PUBLIC – CREATE TESTIMONIAL
=============================== */
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, role, message, imageUrl, rating } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message required",
      });
    }

    const safeRating =
      typeof rating === "number" && rating >= 1 && rating <= 5
        ? rating
        : 5;

    const inserted = await db
      .insert(testimonials)
      .values({
        name: name.trim(),
        role: role?.trim() || null,
        message: message.trim(),
        imageUrl: imageUrl || null,
        rating: safeRating,
        isActive: false,
      })
      .returning();

    const newTestimonial = inserted[0];

    // 🔔 REAL TIME
    io.emit("new_testimonial", newTestimonial);

    return res.status(201).json({
      success: true,
      message: "Testimonial submitted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to submit testimonial" });
  }
};

/* ===============================
   ADMIN – GET ALL
=============================== */
export const getAllTestimonials = async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

/* ===============================
   ADMIN – TOGGLE
=============================== */
export const toggleTestimonial = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existing = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id))
      .limit(1);

    if (!existing.length)
      return res.status(404).json({ message: "Not found" });

    await db
      .update(testimonials)
      .set({ isActive: !existing[0].isActive })
      .where(eq(testimonials.id, id));

    return res.json({ success: true });
  } catch {
    return res.status(500).json({ message: "Failed to update" });
  }
};

/* ===============================
   ADMIN – DELETE
=============================== */
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await db.delete(testimonials).where(eq(testimonials.id, id));

    return res.json({ success: true });
  } catch {
    return res.status(500).json({ message: "Failed to delete" });
  }
};
