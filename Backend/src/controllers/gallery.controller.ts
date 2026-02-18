import { Request, Response } from "express";
import { db } from "../db";
import { gallery } from "../db/schema";
import { eq, desc } from "drizzle-orm";

/* ======================================
   PUBLIC – get gallery
====================================== */
export const getGallery = async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select({
        id: gallery.id,
        type: gallery.type,
        mediaUrl: gallery.mediaUrl,
        createdAt: gallery.createdAt,
      })
      .from(gallery)
      .orderBy(desc(gallery.createdAt));

    return res.json(data);
  } catch (error) {
    console.error("❌ Get gallery error:", error);
    return res.status(500).json({ message: "Failed to fetch gallery" });
  }
};

/* ======================================
   ADMIN – add gallery item
====================================== */
export const addGalleryItem = async (req: Request, res: Response) => {
  try {
    const { type, mediaUrl } = req.body;

    if (!type || !mediaUrl) {
      return res.status(400).json({
        success: false,
        message: "type and mediaUrl are required",
      });
    }

    await db.insert(gallery).values({
      type,
      mediaUrl,
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("❌ Add gallery error:", error);
    return res.status(500).json({ message: "Failed to add gallery item" });
  }
};

/* ======================================
   ADMIN – delete gallery item
====================================== */
export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await db.delete(gallery).where(eq(gallery.id, id));
    return res.json({ success: true });
  } catch (error) {
    console.error("❌ Delete gallery error:", error);
    return res.status(500).json({ message: "Failed to delete gallery item" });
  }
};
