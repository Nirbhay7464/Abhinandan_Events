import { Request, Response } from "express";
import { db } from "../db";
import {
  gallery,
  events,
  testimonials,
  enquiries,
  bookings,
} from "../db/schema";

export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const [
      galleryCount,
      eventsCount,
      testimonialsCount,
      enquiriesCount,
      bookingsCount,
    ] = await Promise.all([
      db.select().from(gallery),
      db.select().from(events),
      db.select().from(testimonials),
      db.select().from(enquiries),
      db.select().from(bookings),
    ]);

    return res.json({
      gallery: galleryCount.length,
      events: eventsCount.length,
      testimonials: testimonialsCount.length,
      enquiries: enquiriesCount.length,
      bookings: bookingsCount.length,
    });
  } catch (error) {
    console.error("❌ Dashboard stats error:", error);
    return res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });
  }
};
