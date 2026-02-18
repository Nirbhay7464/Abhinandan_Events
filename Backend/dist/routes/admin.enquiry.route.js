"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enquiry_controller_1 = require("../controllers/enquiry.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.adminAuth, enquiry_controller_1.getAllEnquiries);
exports.default = router;
