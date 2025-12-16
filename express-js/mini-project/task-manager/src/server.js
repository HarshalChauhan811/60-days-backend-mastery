// ===============================
// 🌍 GLOBAL IMPORTS
// ===============================

// 🚀 Express framework import
// Server + APIs banane ke liye use hota hai
import express from "express";

// 🧠 express-session
// Server-side session management ke liye
import session from "express-session";

// 🍪 cookie-parser
// Incoming cookies ko parse karke req.cookies me laata hai
import cookieParse from "cookie-parser";


// ===============================
// 📦 LOCAL IMPORTS
// ===============================

// 🔐 Auth related routes (login, logout)
import authRoute from "./routes/auth.routes.js";

// 📝 Task related routes (CRUD operations)
import taskRoute from "./routes/task.routes.js";


// ===============================
// 🏗️ APP INITIALIZATION
// ===============================

const app = express();
const PORT = 8080;


// ===============================
// 🔄 GLOBAL MIDDLEWARES
// ===============================

// 🔹 JSON BODY PARSER
// Ye middleware Express ko bolta hai:
// “Agar request ke body me JSON data aaye,
// to usse JavaScript object me convert kar dena.”
//
// Without this → req.body undefined hota
app.use(express.json());


// 🔹 SESSION MIDDLEWARE
// Ye server-side sessions ko enable karta hai
// Browser ko sirf ek session ID cookie milti hai
app.use(
  session({
    secret: "your-secret-key", // 🔐 session ID ko sign karta hai
    resave: false,             // ♻️ bina change session ko dobara save nahi karega
    saveUninitialized: false,  // ❌ bina login session create nahi karega
    cookie: {
      httpOnly: true,          // 🛡️ JS se access nahi hoga (XSS protection)
      secure: false,           // 🔒 HTTPS me true karte hain
      maxAge: 1000 * 60 * 60 * 24 // ⏳ 1 day session expiry
    }
  })
);


// 🔹 COOKIE PARSER
// Incoming request ki cookies ko
// req.cookies object me convert karta hai
app.use(cookieParse());


// ===============================
// 🛣️ ROUTES
// ===============================

// 🏠 ROOT ROUTE
// Server running check ke liye
app.get("/", (req, res) => {
  res.send("Welcome to Task Manager API 📗");
});


// 🔐 AUTH ROUTES
// /auth se start hone wali saari requests
// authRoute router ke paas forward ho jaayengi
// Example:
// POST /auth/login
// GET  /auth/logout
app.use("/auth", authRoute);


// 📝 TASK ROUTES
// /task se start hone wali saari requests
// taskRoute router ke paas jaayengi
// Example:
// GET    /task
// POST   /task
// PUT    /task/:id
// DELETE /task/:id
app.use("/task", taskRoute);


// ===============================
// 🚀 SERVER LISTEN
// ===============================

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
