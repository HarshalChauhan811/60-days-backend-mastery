// 🔐 AUTH MIDDLEWARE
// Ye middleware protected routes ke liye use hota hai
// Kaam:
// 1️⃣ Check karega user logged-in hai ya nahi
// 2️⃣ Agar session valid hai → request aage bhej dega
// 3️⃣ Agar session nahi hai → 401 Unauthorized return karega

export const authMiddleware = (req, res, next) => {

    // 🪵 Debugging ke liye
    // Console me current session user print karega
    console.log("Auth Middleware:", req.session?.user);

    // ✅ AUTH CHECK
    // req.session → session exist karta hai ya nahi
    // req.session.user → user login hai ya nahi
    if (req.session && req.session.user) {

        // 🚦 next() ka matlab:
        // "Is request ko agle middleware / controller ke paas bhej do"
        return next();
    }

    // ❌ Agar user login nahi hai
    // 401 → Unauthorized (authentication required)
    res.status(401).json({
        message: "Unauthorized: Please Login In"
    });
};
