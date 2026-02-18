import { Router } from "express";
import { getAllEnquiries } from "../controllers/enquiry.controller";
import { adminAuth } from "../auth/auth.middleware";

const router = Router();

router.get("/", adminAuth, getAllEnquiries);

export default router;
