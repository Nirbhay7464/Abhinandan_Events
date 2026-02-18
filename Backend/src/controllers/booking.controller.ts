import { Request, Response } from "express";
import { db } from "../db";
import { bookings } from "../db/schema";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import twilio from "twilio";
import { io } from "../server";

/* ===============================
   CREATE BOOKING
================================= */
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      preferredContact,
      eventType,
      guestCount,
      eventDate,
      budget,
      venue,
      notes,
    } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email required",
      });
    }

    /* ===============================
       SAVE TO DATABASE
    ================================= */
    const [newBooking] = await db
      .insert(bookings)
      .values({
        fullName,
        email,
        phone,
        preferredContact,
        eventType,
        guestCount: guestCount ? Number(guestCount) : null,
        eventDate: eventDate || null,
        budget,
        venue,
        notes,
        status: "pending",
      })
      .returning();

    /* ===============================
       EMAIL TO ADMIN
    ================================= */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Abhinandan Events" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🎉 New Booking Inquiry",
      html: `
        <h3>New Booking Received</h3>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Event:</b> ${eventType}</p>
        <p><b>Date:</b> ${eventDate}</p>
        <p><b>Guests:</b> ${guestCount}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Venue:</b> ${venue}</p>
        <p><b>Notes:</b> ${notes}</p>
      `,
    });

    /* ===============================
       WHATSAPP TO ADMIN
    ================================= */
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    await client.messages.create({
      body: `🎉 New Booking

Name: ${fullName}
Event: ${eventType}
Date: ${eventDate}
Guests: ${guestCount}`,
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: process.env.ADMIN_WHATSAPP_NUMBER!,
    });

    /* ===============================
       REAL-TIME SOCKET
    ================================= */
    io.emit("new_booking", newBooking);

    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully",
    });
  } catch (error) {
    console.error("❌ Booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit booking",
    });
  }
};

/* ===============================
   APPROVE BOOKING
================================= */
export const approveBooking = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, id));

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // ✅ Update status
    await db
      .update(bookings)
      .set({ status: "approved" })
      .where(eq(bookings.id, id));

    

    /* ===============================
       EMAIL TO CLIENT
    ================================= */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Abhinandan Events" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "🎉 Your Booking Has Been Approved!",
      html: `
        <h2>Hello ${booking.fullName},</h2>
        <p>Great news! 🎉</p>
        <p>Your booking enquiry has been <b>approved</b>.</p>
        <p>Our team will contact you shortly to discuss further details.</p>
        <br/>
        <p>Warm regards,</p>
        <p><b>Abhinandan Events Team</b></p>
      `,
    });

    /* ===============================
       WHATSAPP TO CLIENT
    ================================= */
    if (booking.phone) {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );

      await client.messages.create({
        body: `Hello ${booking.fullName}, 🎉

Your booking enquiry has been APPROVED!

Our team will contact you shortly.

— Abhinandan Events`,
        from: process.env.TWILIO_WHATSAPP_NUMBER!,
        to: `whatsapp:${booking.phone}`,
      });
    }

    /* ===============================
       SOCKET UPDATE
    ================================= */
    io.emit("booking_approved", { id });

    return res.json({
      success: true,
      message: "Booking approved successfully",
    });
  } catch (error) {
    console.error("❌ Approve booking error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to approve booking",
    });
  }
};
export const sendBookingWhatsApp = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, id));

    if (!booking) {
      return res.status(404).json({ success: false });
    }

    if (!booking.phone) {
      return res.status(400).json({
        success: false,
        message: "Client phone not available",
      });
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    await client.messages.create({
      body: `Hello ${booking.fullName},

Our team from Abhinandan Events will contact you shortly regarding your booking.

Thank you! 🎉`,
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: `whatsapp:${booking.phone}`,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("❌ WhatsApp error:", error);
    return res.status(500).json({ success: false });
  }
};
