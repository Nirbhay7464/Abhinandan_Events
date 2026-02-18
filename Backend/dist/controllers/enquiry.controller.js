"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEnquiries = exports.submitEnquiry = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const notification_service_1 = require("../services/notification.service");
/* ===============================
   PUBLIC – Submit Enquiry
=============================== */
const submitEnquiry = async (req, res) => {
    try {
        const { name, email, phone, eventType, message } = req.body;
        // ✅ Basic validation
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required",
            });
        }
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedMessage = message.trim();
        const trimmedPhone = phone?.trim() || null;
        const trimmedEventType = eventType?.trim() || null;
        // ✅ Save to DB
        await db_1.db.insert(schema_1.enquiries).values({
            name: trimmedName,
            email: trimmedEmail,
            phone: trimmedPhone,
            eventType: trimmedEventType,
            message: trimmedMessage,
        });
        // ✅ Send notifications (non-blocking safe)
        Promise.all([
            (0, notification_service_1.sendEmailNotification)({
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone ?? undefined,
                message: trimmedMessage,
            }),
            (0, notification_service_1.sendWhatsAppNotification)({
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone ?? undefined,
                message: trimmedMessage,
            }),
        ]).catch((err) => {
            console.error("⚠️ Notification error:", err);
        });
        return res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
        });
    }
    catch (error) {
        console.error("❌ Submit enquiry error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to submit enquiry",
        });
    }
};
exports.submitEnquiry = submitEnquiry;
/* ===============================
   ADMIN – Get All Enquiries
=============================== */
const getAllEnquiries = async (_req, res) => {
    try {
        const data = await db_1.db
            .select()
            .from(schema_1.enquiries)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.enquiries.createdAt));
        return res.json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error("❌ Get enquiries error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries",
        });
    }
};
exports.getAllEnquiries = getAllEnquiries;
