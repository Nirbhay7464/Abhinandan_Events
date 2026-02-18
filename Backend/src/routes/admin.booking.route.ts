import { Router } from "express";
import { db } from "../db";
import { bookings } from "../db/schema";
import { desc } from "drizzle-orm";
import { adminAuth } from "../auth/auth.middleware";
import { approveBooking, sendBookingWhatsApp } from "../controllers/booking.controller";


const router = Router();

router.patch("/:id/approve", adminAuth, approveBooking);
router.post("/:id/whatsapp", adminAuth, sendBookingWhatsApp);
router.get("/", adminAuth, async (_req, res) => {
  const data = await db
    .select()
    .from(bookings)
    .orderBy(desc(bookings.createdAt));

  res.json(data);
});

export default router;
