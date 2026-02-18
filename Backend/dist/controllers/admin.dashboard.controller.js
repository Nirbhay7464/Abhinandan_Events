"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const getDashboardStats = async (_req, res) => {
    try {
        const [galleryCount, eventsCount, testimonialsCount, enquiriesCount, bookingsCount,] = await Promise.all([
            db_1.db.select().from(schema_1.gallery),
            db_1.db.select().from(schema_1.events),
            db_1.db.select().from(schema_1.testimonials),
            db_1.db.select().from(schema_1.enquiries),
            db_1.db.select().from(schema_1.bookings),
        ]);
        return res.json({
            gallery: galleryCount.length,
            events: eventsCount.length,
            testimonials: testimonialsCount.length,
            enquiries: enquiriesCount.length,
            bookings: bookingsCount.length,
        });
    }
    catch (error) {
        console.error("❌ Dashboard stats error:", error);
        return res.status(500).json({
            message: "Failed to fetch dashboard stats",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
