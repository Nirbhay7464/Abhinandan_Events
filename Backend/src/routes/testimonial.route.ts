import { Router } from "express";
import {
  getTestimonials,
  createTestimonial,
} from "../controllers/testimonial.controller";

const router = Router();

router.get("/", getTestimonials);
router.post("/", createTestimonial);

export default router;
