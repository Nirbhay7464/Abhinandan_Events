import { Router } from "express";
import { getEvents, getSingleEvent } from "../controllers/events.controller";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getSingleEvent);

export default router;
