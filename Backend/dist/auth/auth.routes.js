"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
/**
 * ADMIN AUTH
 * POST /api/admin/auth/login
 */
router.post("/login", auth_controller_1.adminLogin);
exports.default = router;
