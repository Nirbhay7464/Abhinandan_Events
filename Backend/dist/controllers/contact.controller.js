"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContacts = exports.submitContact = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const server_1 = require("../server");
const submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const inserted = await db_1.db
            .insert(schema_1.enquiries)
            .values({
            name,
            email,
            phone: phone || null,
            message,
        })
            .returning();
        const newContact = inserted[0];
        // 🔔 REAL TIME EMIT
        server_1.io.emit("new_contact", newContact);
        return res.status(201).json({ success: true });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to submit contact form" });
    }
};
exports.submitContact = submitContact;
const getContacts = async (_req, res) => {
    try {
        const data = await db_1.db
            .select()
            .from(schema_1.enquiries)
            .orderBy((0, drizzle_orm_1.desc)(schema_1.enquiries.createdAt));
        return res.json(data);
    }
    catch {
        return res.status(500).json({ message: "Failed to fetch contacts" });
    }
};
exports.getContacts = getContacts;
