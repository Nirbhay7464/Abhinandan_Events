import { Router } from "express";
import { adminLogin } from "./auth.controller";

const router = Router();

/**
 * ADMIN AUTH
 * POST /api/admin/auth/login
 */
router.post("/login", adminLogin);

export default router;
