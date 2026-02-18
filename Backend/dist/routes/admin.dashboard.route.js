"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_dashboard_controller_1 = require("../controllers/admin.dashboard.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
/**
 * GET /api/admin/dashboard
 */
router.get("/", auth_middleware_1.adminAuth, admin_dashboard_controller_1.getDashboardStats);
exports.default = router;
