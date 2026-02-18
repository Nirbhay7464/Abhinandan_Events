"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // ✅ Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        // ✅ Fetch admin
        const admin = await db_1.db
            .select()
            .from(schema_1.admins)
            .where((0, drizzle_orm_1.eq)(schema_1.admins.email, email))
            .limit(1);
        if (!admin.length) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // ✅ Password check
        const validPassword = await bcrypt_1.default.compare(password, admin[0].password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }
        // ✅ JWT secret safety check
        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET missing");
            return res.status(500).json({
                success: false,
                message: "Server misconfiguration",
            });
        }
        // ✅ Token
        const token = jsonwebtoken_1.default.sign({ adminId: admin[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
            success: true,
            token,
        });
    }
    catch (error) {
        console.error("❌ Admin login error:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
        });
    }
};
exports.adminLogin = adminLogin;
