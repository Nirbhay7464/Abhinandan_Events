"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const enquiry_routes_1 = __importDefault(require("./routes/enquiry.routes"));
const testimonial_route_1 = __importDefault(require("./routes/testimonial.route"));
const gallery_routes_1 = __importDefault(require("./routes/gallery.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const admin_testimonial_route_1 = __importDefault(require("./routes/admin.testimonial.route"));
const admin_dashboard_route_1 = __importDefault(require("./routes/admin.dashboard.route"));
const admin_gallery_route_1 = __importDefault(require("./routes/admin.gallery.route"));
const admin_events_route_1 = __importDefault(require("./routes/admin.events.route"));
const admin_enquiry_route_1 = __importDefault(require("./routes/admin.enquiry.route"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const admin_booking_route_1 = __importDefault(require("./routes/admin.booking.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
/* ✅ Health check */
app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "API is running 🚀" });
});
/* ✅ Core APIs */
app.use("/api/testimonials", testimonial_route_1.default);
app.use("/api/admin/testimonials", admin_testimonial_route_1.default);
app.use("/api/enquiry", enquiry_routes_1.default);
app.use("/api/gallery", gallery_routes_1.default);
app.use("/api/events", events_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
app.use("/api/gallery", gallery_routes_1.default);
app.use("/api/events", events_routes_1.default);
app.use("/api/booking", booking_route_1.default);
/* ✅ Admin Auth */
app.use("/api/admin/auth", auth_routes_1.default);
app.use("/api/admin/dashboard", admin_dashboard_route_1.default);
app.use("/api/admin/gallery", admin_gallery_route_1.default);
app.use("/api/admin/events", admin_events_route_1.default);
app.use("/api/admin/enquiries", admin_enquiry_route_1.default);
app.use("/api/admin/bookings", admin_booking_route_1.default);
exports.default = app;
