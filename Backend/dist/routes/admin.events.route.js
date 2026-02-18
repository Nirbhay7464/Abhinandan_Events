"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.adminAuth, events_controller_1.addEvent);
router.delete("/:id", auth_middleware_1.adminAuth, events_controller_1.deleteEvent);
exports.default = router;
