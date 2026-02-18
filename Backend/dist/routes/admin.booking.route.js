"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const auth_middleware_1 = require("../auth/auth.middleware");
const booking_controller_1 = require("../controllers/booking.controller");
const router = (0, express_1.Router)();
router.patch("/:id/approve", auth_middleware_1.adminAuth, booking_controller_1.approveBooking);
router.post("/:id/whatsapp", auth_middleware_1.adminAuth, booking_controller_1.sendBookingWhatsApp);
router.get("/", auth_middleware_1.adminAuth, async (_req, res) => {
    const data = await db_1.db
        .select()
        .from(schema_1.bookings)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.bookings.createdAt));
    res.json(data);
});
exports.default = router;
