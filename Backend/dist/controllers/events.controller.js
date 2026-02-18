"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.addEvent = exports.getSingleEvent = exports.getEvents = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
/* ======================================
   PUBLIC – GET EVENTS
   GET /api/events
====================================== */
const getEvents = async (_req, res) => {
    try {
        const data = await db_1.db
            .select()
            .from(schema_1.events)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.events.eventDate));
        const formatted = data.map((e) => ({
            id: e.id,
            title: e.title,
            // 🔥 SAFE IMAGE RETURN
            image: Array.isArray(e.images) && e.images.length > 0
                ? e.images[0]
                : "/placeholder.jpg",
            thumbnails: Array.isArray(e.images) && e.images.length > 0
                ? e.images.slice(0, 5)
                : [],
            date: new Date(e.eventDate).toDateString(),
            attendees: e.attendees || 0,
            client: e.client || "Client",
            location: e.location || "—",
            description: e.description,
        }));
        return res.json(formatted);
    }
    catch (error) {
        console.error("❌ Get events error:", error);
        return res.status(500).json({ message: "Failed to fetch events" });
    }
};
exports.getEvents = getEvents;
/* ======================================
   PUBLIC – GET SINGLE EVENT
   GET /api/events/:id
====================================== */
const getSingleEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = await db_1.db
            .select()
            .from(schema_1.events)
            .where((0, drizzle_orm_1.eq)(schema_1.events.id, id))
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
    }
    catch (error) {
        console.error("❌ Get single event error:", error);
        return res.status(500).json({ message: "Failed to fetch event" });
    }
};
exports.getSingleEvent = getSingleEvent;
/* ======================================
   ADMIN – ADD EVENT
   POST /api/admin/events
====================================== */
const addEvent = async (req, res) => {
    try {
        const { title, images, description, eventDate, attendees, client, location, } = req.body;
        if (!title || !Array.isArray(images) || images.length === 0 || !description) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        await db_1.db.insert(schema_1.events).values({
            title,
            images: images, // 🔥 IMPORTANT
            description,
            eventDate,
            attendees: attendees || 0,
            client: client || null,
            location: location || null,
        });
        return res.status(201).json({ success: true });
    }
    catch (error) {
        console.error("❌ Add event error:", error);
        return res.status(500).json({ message: "Failed to add event" });
    }
};
exports.addEvent = addEvent;
/* ======================================
   ADMIN – DELETE EVENT
====================================== */
const deleteEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db_1.db.delete(schema_1.events).where((0, drizzle_orm_1.eq)(schema_1.events.id, id));
        return res.json({ success: true });
    }
    catch (error) {
        console.error("❌ Delete event error:", error);
        return res.status(500).json({ message: "Failed to delete event" });
    }
};
exports.deleteEvent = deleteEvent;
