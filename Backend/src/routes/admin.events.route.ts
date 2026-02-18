import { Router } from "express";
import { addEvent, deleteEvent } from "../controllers/events.controller";
import { adminAuth } from "../auth/auth.middleware";

const router = Router();

router.post("/", adminAuth, addEvent);
router.delete("/:id", adminAuth, deleteEvent);

export default router;
