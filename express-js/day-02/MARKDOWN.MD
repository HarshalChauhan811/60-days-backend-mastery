# 📘 The Express.js Masterclass: Middleware & Routing

## 🧠 Part 1: First Principles (Basics)

### 1. Web Server Kya Hai? (The Concept)
Socho ek **Restaurant** hai.
*   **Client (Browser):** Customer jo order deta hai.
*   **Request (`req`):** Customer ka order (e.g., "Mujhe Burger chahiye").
*   **Server (Express App):** Wo Kitchen jaha sab banta hai.
*   **Response (`res`):** Wo plate jo customer ko wapas milti hai (Burger).

### 2. Middleware Kya Hai? (The Middle Man)
Middleware wo insaan ya machine hai jo **Order aane (Request)** aur **Khaana banne (Response)** ke **BEECH (Middle)** mein khadi hai.

> **Definition:** Middleware ek function hai jo Request ko rok sakta hai, check kar sakta hai, modify kar sakta hai, ya aage bhej sakta hai.

#### 🏠 Real Life Example: Water Purifier (RO)
*   **Pipe se Paani Aaya (Request)** ➡️ **Sediment Filter (Middleware 1)** ➡️ **Carbon Filter (Middleware 2)** ➡️ **Glass me Paani (Response)**.
*   Agar *Filter 1* me kachra atak gaya, to paani aage nahi jayega (Request Rejected).
*   Agar sab clean hai, to paani glass tak pahuchega.

---

## 🛠 Part 2: The Logic (How it Works)

Middleware ke paas 3 superpowers hoti hain:
1.  **`req` (Request):** User ne kya bheja hai (Data, Token, IP address).
2.  **`res` (Response):** User ko kya wapas bhejna hai.
3.  **`next()` (The Green Signal):** Sabse important! Iska matlab hai "Mera kaam ho gaya, ab agle bande ke paas jao."

> ⚠️ **Important:** Agar tumne `next()` call nahi kiya aur response bhi send nahi kiya, to website ghoomti rahegi (Loading...) kyunki server atak gaya hai.

---

## 🚀 Part 3: Types of Middleware (With Code)

Yaha humne tumhare saare examples cover kiye hain.

### 1. Global Middleware (Application Level)
Ye **Factory ke Main Gate** jaisa hai. Har employee (Request) ko yahan se guzarna hi padega.
*   *Use Case:* Logging (Note karna kaun aaya), Maintenance Mode.

### 2. Specific Route Middleware
Ye **VIP Room** ke darwaze jaisa hai. Sirf wahi log check honge jo VIP room me jaana chahte hain.
*   *Use Case:* Auth (Login check karna), Payment Validation.

### 3. Inbuilt Middleware
Jo Express pehle se bana ke deta hai.
*   *Use Case:* `express.json()` (Body se data padhne ke liye).

---

## 📂 Part 4: Complete Code Structure (Best Practice)

Bhai, saara code alag-alag files me tod kar likha hai taaki "Kichdi" na bane. Is structure ko follow karo.

### 📄 File 1: `middleware.js` (Saare Logic Yahan)
Ye file tumhare "guards" aur "checkers" ki list hai.

```javascript
// --- MIDDLEWARE COLLECTION ---

// 1. Logger Middleware (Ye note karega kaun aaya)
export const loggerMiddleware = (req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[LOG] Request on: ${req.url} at ${time}`);
    // ✅ Next call kiya taaki request aage badhe
    next(); 
};

// 2. Auth Middleware (Ye check karega ID card)
export const authMiddleware = (req, res, next) => {
    const isLoggedIn = true; // Maan lo user logged in hai (Try changing to false)
    
    if (isLoggedIn) {
        console.log("✅ User Verified! Aage jao.");
        next(); 
    } else {
        // 🛑 Yahi rok do!
        console.log("❌ Bhag yaha se! Unauthorized.");
        res.status(401).send("Sorry bhai, entry nahi milegi."); 
    }
};

// 3. Maintenance Middleware (Dukan band hai?)
export const maintenanceMiddleware = (req, res, next) => {
    const isMaintenanceOn = false; // Agar true kar diya to site band
    
    if (isMaintenanceOn) {
        res.send("🚧 Site under maintenance. Baad me aana.");
    } else {
        next();
    }
};
```

---

### 📄 File 2: `user.routes.js` (User ka Department)
Ye sirf **Users** se related kaam sambhalega. `index.js` ko clean rakhne ke liye humne `Router` use kiya.

```javascript
import { Router } from "express";
import { authMiddleware } from "./middleware.js"; // Specific middleware import kiya

const userRouter = Router();

// Route: /api/v1/users/create-user
userRouter.get("/create-user", (req, res) => {
    res.send("🎉 New User Created Successfully!");
});

// Route: /api/v1/users/get-all
userRouter.get("/get-all", (req, res) => {
    res.send("📜 List of All Users");
});

// ⭐ SPECIAL ROUTE: Isme humne 'authMiddleware' lagaya hai
// Sirf is route pe user check hoga.
userRouter.get("/secret-profile", authMiddleware, (req, res) => {
    res.send("🤫 Welcome to Secret User Profile (Only for Logged In Users)");
});

export default userRouter;
```

---

### 📄 File 3: `index.js` (The Main Headquarters)
Ye tumhara entry point hai. Sab kuch yahi judega.

```javascript
import express from "express";
import userRouter from "./routers/user.routes.js";
import { loggerMiddleware, maintenanceMiddleware } from "./middleware.js";

const app = express();
const PORT = 3000;

// --- STEP 1: GLOBAL MIDDLEWARES (Sabse pehle ye run honge) ---

// Inbuilt Middleware (JSON data padhne ke liye)
app.use(express.json()); 

// Custom Logger (Har request log hogi)
app.use(loggerMiddleware);

// Maintenance Check (Agar on hai to yahi se wapas bhej dega)
app.use(maintenanceMiddleware);


// --- STEP 2: ROUTING (Traffic Divide Karna) ---

// Agar koi URL '/api/v1/users' se shuru ho, to 'userRouter' ke paas bhejo
app.use("/api/v1/users", userRouter);


// --- STEP 3: BASE ROUTES ---

app.get("/", (req, res) => {
    res.send("🌍 Hello World! Server is Live.");
});

// --- STEP 4: START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
```

---

## 📝 Summary (Exam Notes)

1.  **Middleware execution order matters!**
    *   Jo `app.use` pehle likha hai, wo pehle chalega.
    *   Example: Agar `MaintenanceMiddleware` sabse upar laga diya aur wo true hai, to neeche ka koi route kaam nahi karega.
2.  **`next()` is the key.**
    *   Bina `next()` ke request "hang" ho jayegi.
    *   Ya to `res.send()` karo (khatam karo), ya `next()` karo (aage badhao).
3.  **Router is for Cleanliness.**
    *   Bina Router ke `index.js` mein 1000 lines ho jayengi. Router se hum code ko folders me baat dete hain.
