import express from "express";
import cors from "cors";

import enquiryRoutes from "./routes/enquiry.routes";
import router from "./routes/testimonial.route";
import galleryRoutes from "./routes/gallery.routes";
import eventsRoutes from "./routes/events.routes";
import contactRoutes from "./routes/contact.routes";
import authRoutes from "./auth/auth.routes";
import adminTestimonialRoutes from "./routes/admin.testimonial.route";
import adminDashboardRoutes from "./routes/admin.dashboard.route";
import adminGalleryRoutes from "./routes/admin.gallery.route";
import adminEventsRoutes from "./routes/admin.events.route";
import adminEnquiryRoutes from "./routes/admin.enquiry.route";
import bookingRoutes from "./routes/booking.route";
import adminBookingRoutes from "./routes/admin.booking.route";


const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ✅ Health check */
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is running 🚀" });
});

/* ✅ Core APIs */
app.use("/api/testimonials", router);
app.use("/api/admin/testimonials", adminTestimonialRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/booking", bookingRoutes);

/* ✅ Admin Auth */
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/gallery", adminGalleryRoutes);
app.use("/api/admin/events", adminEventsRoutes);
app.use("/api/admin/enquiries", adminEnquiryRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);


export default app;
