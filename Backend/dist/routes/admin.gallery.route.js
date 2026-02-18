"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_controller_1 = require("../controllers/gallery.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.adminAuth, gallery_controller_1.addGalleryItem);
router.delete("/:id", auth_middleware_1.adminAuth, gallery_controller_1.deleteGalleryItem);
exports.default = router;
