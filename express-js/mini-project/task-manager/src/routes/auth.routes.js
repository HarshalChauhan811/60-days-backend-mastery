// 🚦 Express ka Router import kar rahe hain
// Router → ek mini express app hota hai
import { Router } from "express";

// 🔐 Auth controllers import kar rahe hain
// login → user login logic handle karega
// logout → user logout logic handle karega
import { login, logout } from "../controller/auth.controller.js";


// 🧱 Router instance create kar rahe hain
// Is router ke andar auth-related saare routes define honge
const router = Router();


// ===============================
// 🔑 AUTH ROUTES
// ===============================

// 🔐 LOGIN ROUTE
// Method: POST
// URL: /login
// Kaam:
// - Client se credentials lega
// - login controller ko forward karega
// - Session + cookie set karega
router.post("/login", login);

// 🔓 LOGOUT ROUTE
// Method: GET
// URL: /logout
// Kaam:
// - User ki session destroy karega
// - Cookie clear karega
// - User ko logout karega
router.get("/logout", logout);


// 🚀 Router ko export kar rahe hain
// Ye router app.js me usually is tarah use hota hai:
// app.use("/auth", router);
// Final URLs banenge:
// POST   /auth/login
// GET    /auth/logout
export default router;
