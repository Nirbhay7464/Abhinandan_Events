"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGalleryItem = exports.addGalleryItem = exports.getGallery = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
/* ======================================
   PUBLIC – get gallery
====================================== */
const getGallery = async (_req, res) => {
    try {
        const data = await db_1.db
            .select({
            id: schema_1.gallery.id,
            type: schema_1.gallery.type,
            mediaUrl: schema_1.gallery.mediaUrl,
            createdAt: schema_1.gallery.createdAt,
        })
            .from(schema_1.gallery)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.gallery.createdAt));
        return res.json(data);
    }
    catch (error) {
        console.error("❌ Get gallery error:", error);
        return res.status(500).json({ message: "Failed to fetch gallery" });
    }
};
exports.getGallery = getGallery;
/* ======================================
   ADMIN – add gallery item
====================================== */
const addGalleryItem = async (req, res) => {
    try {
        const { type, mediaUrl } = req.body;
        if (!type || !mediaUrl) {
            return res.status(400).json({
                success: false,
                message: "type and mediaUrl are required",
            });
        }
        await db_1.db.insert(schema_1.gallery).values({
            type,
            mediaUrl,
        });
        return res.status(201).json({ success: true });
    }
    catch (error) {
        console.error("❌ Add gallery error:", error);
        return res.status(500).json({ message: "Failed to add gallery item" });
    }
};
exports.addGalleryItem = addGalleryItem;
/* ======================================
   ADMIN – delete gallery item
====================================== */
const deleteGalleryItem = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await db_1.db.delete(schema_1.gallery).where((0, drizzle_orm_1.eq)(schema_1.gallery.id, id));
        return res.json({ success: true });
    }
    catch (error) {
        console.error("❌ Delete gallery error:", error);
        return res.status(500).json({ message: "Failed to delete gallery item" });
    }
};
exports.deleteGalleryItem = deleteGalleryItem;
