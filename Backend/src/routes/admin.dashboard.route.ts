import { Router } from "express";
import { getDashboardStats } from "../controllers/admin.dashboard.controller";
import { adminAuth } from "../auth/auth.middleware";

const router = Router();

/**
 * GET /api/admin/dashboard
 */
router.get("/", adminAuth, getDashboardStats);

export default router;
