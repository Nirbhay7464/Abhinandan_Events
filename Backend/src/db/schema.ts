import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  date,
    integer,
    jsonb,
} from "drizzle-orm/pg-core";

/* =======================
   ADMINS
======================= */
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});


export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role"),
  message: text("message").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(false),
  rating: integer("rating").notNull().default(5), 
  createdAt: timestamp("created_at").defaultNow(),
});



export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  mediaUrl: text("media_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  createdAt: timestamp("created_at").defaultNow(),
});
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),

  images: jsonb("images").$type<string[]>().notNull(), // 🔥 CHANGE HERE

  description: text("description").notNull(),
  eventDate: date("event_date").notNull(),
  attendees: integer("attendees"),
  client: text("client"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  eventType: text("event_type"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredContact: text("preferred_contact"),
  eventType: text("event_type"),
  guestCount: integer("guest_count"),
  eventDate: date("event_date"),
  budget: text("budget"),
  venue: text("venue"),
  notes: text("notes"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

