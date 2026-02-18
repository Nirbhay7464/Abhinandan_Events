import { Router } from "express";
import { createBooking, approveBooking } from "../controllers/booking.controller";

const router = Router();

router.post("/", createBooking);
router.patch("/:id/approve", approveBooking);

export default router;

