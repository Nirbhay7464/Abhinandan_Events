"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTestimonial = exports.toggleTestimonial = exports.getAllTestimonials = exports.createTestimonial = exports.getTestimonials = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const server_1 = require("../server");
/* ===============================
   PUBLIC – GET APPROVED
=============================== */
const getTestimonials = async (_req, res) => {
    try {
        const data = await db_1.db
            .select()
            .from(schema_1.testimonials)
            .where((0, drizzle_orm_1.eq)(schema_1.testimonials.isActive, true))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.testimonials.createdAt));
        return res.json(data);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
};
exports.getTestimonials = getTestimonials;
/* ===============================
   PUBLIC – CREATE TESTIMONIAL
=============================== */
const createTestimonial = async (req, res) => {
    try {
        const { name, role, message, imageUrl, rating } = req.body;
        if (!name || !message) {
            return res.status(400).json({
                message: "Name and message required",
            });
        }
        const safeRating = typeof rating === "number" && rating >= 1 && rating <= 5
            ? rating
            : 5;
        const inserted = await db_1.db
            .insert(schema_1.testimonials)
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
        server_1.io.emit("new_testimonial", newTestimonial);
        return res.status(201).json({
            success: true,
            message: "Testimonial submitted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to submit testimonial" });
    }
};
exports.createTestimonial = createTestimonial;
/* ===============================
   ADMIN – GET ALL
=============================== */
const getAllTestimonials = async (_req, res) => {
    try {
        const data = await db_1.db
            .select()
            .from(schema_1.testimonials)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.testimonials.createdAt));
        return res.json(data);
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
};
exports.getAllTestimonials = getAllTestimonials;
/* ===============================
   ADMIN – TOGGLE
=============================== */
const toggleTestimonial = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const existing = await db_1.db
            .select()
            .from(schema_1.testimonials)
            .where((0, drizzle_orm_1.eq)(schema_1.testimonials.id, id))
            .limit(1);
        if (!existing.length)
            return res.status(404).json({ message: "Not found" });
        await db_1.db
            .update(schema_1.testimonials)
            .set({ isActive: !existing[0].isActive })
            .where((0, drizzle_orm_1.eq)(schema_1.testimonials.id, id));
        return res.json({ success: true });
    }
    catch {
        return res.status(500).json({ message: "Failed to update" });
    }
};
exports.toggleTestimonial = toggleTestimonial;
/* ===============================
   ADMIN – DELETE
=============================== */
const deleteTestimonial = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db_1.db.delete(schema_1.testimonials).where((0, drizzle_orm_1.eq)(schema_1.testimonials.id, id));
        return res.json({ success: true });
    }
    catch {
        return res.status(500).json({ message: "Failed to delete" });
    }
};
exports.deleteTestimonial = deleteTestimonial;
