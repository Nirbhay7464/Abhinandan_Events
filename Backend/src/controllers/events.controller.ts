import { Request, Response } from "express";
import { db } from "../db";
import { events } from "../db/schema";
import { desc, eq } from "drizzle-orm";

/* ======================================
   PUBLIC – GET EVENTS
   GET /api/events
====================================== */
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const data = await db
      .select()
      .from(events)
      .orderBy(desc(events.eventDate));

    const formatted = data.map((e) => ({
      id: e.id,
      title: e.title,

      // 🔥 SAFE IMAGE RETURN
      image:
        Array.isArray(e.images) && e.images.length > 0
          ? e.images[0]
          : "/placeholder.jpg",

      thumbnails:
        Array.isArray(e.images) && e.images.length > 0
          ? e.images.slice(0, 5)
          : [],

      date: new Date(e.eventDate).toDateString(),
      attendees: e.attendees || 0,
      client: e.client || "Client",
      location: e.location || "—",
      description: e.description,
    }));

    return res.json(formatted);
  } catch (error) {
    console.error("❌ Get events error:", error);
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};

/* ======================================
   PUBLIC – GET SINGLE EVENT
   GET /api/events/:id
====================================== */
export const getSingleEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const data = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!data.length) {
      return res.status(404).json({ message: "Event not found" });
    }

    const e = data[0];

    return res.json({
      id: e.id,
      title: e.title,
      images: Array.isArray(e.images) ? e.images : [],
      date: new Date(e.eventDate).toDateString(),
      attendees: e.attendees || 0,
      client: e.client || "Client",
      location: e.location || "—",
      description: e.description,
    });
  } catch (error) {
    console.error("❌ Get single event error:", error);
    return res.status(500).json({ message: "Failed to fetch event" });
  }
};


/* ======================================
   ADMIN – ADD EVENT
   POST /api/admin/events
====================================== */
export const addEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      images,
      description,
      eventDate,
      attendees,
      client,
      location,
    } = req.body;

    if (!title || !Array.isArray(images) || images.length === 0 || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db.insert(events).values({
      title,
      images: images, // 🔥 IMPORTANT
      description,
      eventDate,
      attendees: attendees || 0,
      client: client || null,
      location: location || null,
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("❌ Add event error:", error);
    return res.status(500).json({ message: "Failed to add event" });
  }
};

/* ======================================
   ADMIN – DELETE EVENT
====================================== */
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await db.delete(events).where(eq(events.id, id));

    return res.json({ success: true });
  } catch (error) {
    console.error("❌ Delete event error:", error);
    return res.status(500).json({ message: "Failed to delete event" });
  }
};
