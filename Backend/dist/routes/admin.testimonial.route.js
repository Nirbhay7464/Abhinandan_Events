"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimonial_controller_1 = require("../controllers/testimonial.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
/**
 * ADMIN – get all testimonials
 * GET /api/admin/testimonials
 */
router.get("/", auth_middleware_1.adminAuth, testimonial_controller_1.getAllTestimonials);
/**
 * ADMIN – toggle publish/unpublish
 * PATCH /api/admin/testimonials/:id/toggle
 */
router.patch("/:id/toggle", auth_middleware_1.adminAuth, testimonial_controller_1.toggleTestimonial);
/**
 * ADMIN – delete testimonial
 * DELETE /api/admin/testimonials/:id
 */
router.delete("/:id", auth_middleware_1.adminAuth, testimonial_controller_1.deleteTestimonial);
exports.default = router;
