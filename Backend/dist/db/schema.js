"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookings = exports.enquiries = exports.events = exports.gallery = exports.testimonials = exports.admins = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
/* =======================
   ADMINS
======================= */
exports.admins = (0, pg_core_1.pgTable)("admins", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.testimonials = (0, pg_core_1.pgTable)("testimonials", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    role: (0, pg_core_1.text)("role"),
    message: (0, pg_core_1.text)("message").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    isActive: (0, pg_core_1.boolean)("is_active").default(false),
    rating: (0, pg_core_1.integer)("rating").notNull().default(5),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.gallery = (0, pg_core_1.pgTable)("gallery", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    type: (0, pg_core_1.text)("type").notNull(),
    mediaUrl: (0, pg_core_1.text)("media_url").notNull(),
    thumbnailUrl: (0, pg_core_1.text)("thumbnail_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.events = (0, pg_core_1.pgTable)("events", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    images: (0, pg_core_1.jsonb)("images").$type().notNull(), // 🔥 CHANGE HERE
    description: (0, pg_core_1.text)("description").notNull(),
    eventDate: (0, pg_core_1.date)("event_date").notNull(),
    attendees: (0, pg_core_1.integer)("attendees"),
    client: (0, pg_core_1.text)("client"),
    location: (0, pg_core_1.text)("location"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.enquiries = (0, pg_core_1.pgTable)("enquiries", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    eventType: (0, pg_core_1.text)("event_type"),
    message: (0, pg_core_1.text)("message").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.bookings = (0, pg_core_1.pgTable)("bookings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    fullName: (0, pg_core_1.text)("full_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    preferredContact: (0, pg_core_1.text)("preferred_contact"),
    eventType: (0, pg_core_1.text)("event_type"),
    guestCount: (0, pg_core_1.integer)("guest_count"),
    eventDate: (0, pg_core_1.date)("event_date"),
    budget: (0, pg_core_1.text)("budget"),
    venue: (0, pg_core_1.text)("venue"),
    notes: (0, pg_core_1.text)("notes"),
    status: (0, pg_core_1.text)("status").default("pending"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
