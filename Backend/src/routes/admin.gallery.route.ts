import { Router } from "express";
import {
  addGalleryItem,
  deleteGalleryItem,
} from "../controllers/gallery.controller";
import { adminAuth } from "../auth/auth.middleware";

const router = Router();

router.post("/", adminAuth, addGalleryItem);
router.delete("/:id", adminAuth, deleteGalleryItem);

export default router;
