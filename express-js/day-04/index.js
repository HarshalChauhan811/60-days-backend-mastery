// ===============================
// 📦 REQUIRED PACKAGES
// ===============================

// 🍪 cookie-parser
// Browser se aane wali cookies ko read karne ke kaam aata hai
// Signed cookies ko verify bhi kar sakta hai
import cookieParser from "cookie-parser"

// 🚀 express
// Web server + routing + middleware sab handle karta hai
import express from "express"

// 🔐 express-session
// Server-side session banane aur manage karne ke liye
// IMPORTANT: Actual data server par hota hai, cookie me sirf session ID
import session from "express-session"

const app = express()

// =================================================
// 🔐 SESSION MIDDLEWARE (CORE OF AUTH SYSTEM)
// =================================================
app.use(
  session({
    // 👉 secret
    // Session ID ko sign / encrypt karta hai
    // Taaki koi user manually cookie change na kar sake
    secret: "mysecret",

    // 👉 saveUninitialized: false
    // Jab tak session me koi data add na ho
    // tab tak empty session create / store nahi hoga
    // (performance + memory optimization)
    saveUninitialized: false,

    // 👉 resave: false
    // Har request pe session dobara DB / memory me save nahi karega
    // Sirf tab karega jab data change ho
    resave: false,

    // ===================
    // 🍪 COOKIE SETTINGS
    // ===================
    cookie: {
      // 👉 maxAge
      // Session cookie kitni der tak valid rahegi
      // Yaha: 1 day (24 hours)
      maxAge: 1000 * 60 * 60 * 24,

      // (Production concepts – yaad rakhna)
      // httpOnly: true → JS se access block
      // secure: true → HTTPS only
    },
  })
)

// =================================================
// 🍪 COOKIE PARSER MIDDLEWARE
// =================================================
// Client se aane wali cookies ko parse karta hai
// "codesnippet" → signed cookies ke liye secret key
app.use(cookieParser("codesnippet"))

// =================================================
// 🏠 HOME ROUTE
// =================================================
app.get("/", (req, res) => {
  // 👉 req.session
  // Current user ka poora session object
  // Agar user logged in hai to yahi uska data milega
  console.log(req.session)

  // 👉 req.session.id
  // Unique session identifier
  // Ye ID browser ke cookie me store hoti hai
  console.log(req.session.id)

  res.send("Hello World!")
})

// =================================================
// 🔑 LOGIN ROUTE
// =================================================
app.get("/login", (req, res) => {
  // 👉 User login karta hai
  // To hum uska data session ke andar store kar dete hain
  // Ye data server par safe rehta hai
  req.session.user = {
    name: "Harshal",
    email: "Harshal@example.com",
    age: 30,
  }

  // 👉 Is moment pe:
  // 1. Session create ho chuka hai
  // 2. Session ID browser ko cookie ke form me mil chuki hai
  // 3. Next request me user automatically identified hoga
  res.send(`${req.session.user.name} is logged in`)
})

// =================================================
// 🚪 LOGOUT ROUTE
// =================================================
app.get("/logout", (req, res) => {
  // 👉 req.session.destroy()
  // Server se poora session delete kar deta hai
  // Cookie ke andar wali session ID useless ho jaati hai
  req.session.destroy()

  res.send("Logged out")
})

// =================================================
// 🚀 SERVER START
// =================================================
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})




// 🧠 SESSION KA REAL FLOW (INTERVIEW GOLD)
// 1️⃣ User /login hit karta hai
// 2️⃣ Server session create karta hai
// 3️⃣ Session ID → cookie me browser ko milti hai
// 4️⃣ Browser har request ke saath cookie bhejta hai
// 5️⃣ Server cookie se session ID read karta hai
// 6️⃣ Session data access hota hai (req.session)
// 7️⃣ /logout → session destroy → user out

// 🔥 COOKIE vs SESSION (1 Line Me Yaad Rakho)

// Cookie → “ID card” (browser me)

// Session → “File” (server me)

// 🎯 Ye Code Kaha Use Hota Hai?

// Login / Logout system

// Admin panel protection

// User dashboard

// Shopping cart

// Authentication middleware
