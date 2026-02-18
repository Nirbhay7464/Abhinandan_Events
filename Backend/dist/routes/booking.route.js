"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking.controller");
const router = (0, express_1.Router)();
router.post("/", booking_controller_1.createBooking);
router.patch("/:id/approve", booking_controller_1.approveBooking);
exports.default = router;
