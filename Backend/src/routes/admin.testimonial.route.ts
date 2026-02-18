import { Router } from "express";
import {
  getAllTestimonials,
  deleteTestimonial,
  toggleTestimonial,
} from "../controllers/testimonial.controller";
import { adminAuth } from "../auth/auth.middleware";

const router = Router();

/**
 * ADMIN – get all testimonials
 * GET /api/admin/testimonials
 */
router.get("/", adminAuth, getAllTestimonials);

/**
 * ADMIN – toggle publish/unpublish
 * PATCH /api/admin/testimonials/:id/toggle
 */
router.patch("/:id/toggle", adminAuth, toggleTestimonial);

/**
 * ADMIN – delete testimonial
 * DELETE /api/admin/testimonials/:id
 */
router.delete("/:id", adminAuth, deleteTestimonial);

export default router;
