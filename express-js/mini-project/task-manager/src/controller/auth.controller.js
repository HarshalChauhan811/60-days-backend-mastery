// ✅ LOGIN CONTROLLER
// Ye function user ko login karata hai
// Flow:
// 1️⃣ Request body se username uthata hai
// 2️⃣ Validate karta hai (username aaya ya nahi)
// 3️⃣ Session me user data store karta hai (server-side memory)
// 4️⃣ Cookie set karta hai (client-side identification)
// 5️⃣ Success response bhejta hai

export const login = (req, res) => {

    // 📥 Request body se username extract kar rahe hain
    // (express.json() middleware ki wajah se req.body available hai)
    const { username } = req.body;

    // ❌ Agar username nahi aaya
    // Client ki galti → 400 Bad Request
    if (!username) {
        return res.status(400).json({
            error: "Username is required"
        });
    }

    // 🧠 SESSION STORE (Server-side)
    // User ka data server memory / DB (Redis etc.) me store ho jata hai
    // Browser ko sirf session ID milti hai
    req.session.user = { username};

    // 🍪 COOKIE SET (Client-side)
    // username cookie me store ho raha hai
    // httpOnly: true → JS (document.cookie) se access nahi hoga (XSS safe)
    // maxAge: 24 hours → cookie 1 din me expire hogi
    res.cookie("username", username, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 // 1 day
  });

    // ✅ Login successful response
    res.json({message: "Login Successful",  username });
};



// ✅ LOGOUT CONTROLLER
// Ye function user ko logout karta hai
// Flow:
// 1️⃣ Client-side cookie clear karta hai
// 2️⃣ Server-side session destroy karta hai
// 3️⃣ Success / error response bhejta hai

export const logout = (req, res) => {

    // 🍪 Client ke browser se "username" cookie hata rahe hain
    // Taaki browser ke paas koi user info na rahe
    res.clearCookie("username");

    // 🧠 Server-side session destroy kar rahe hain
    // Isse user ka pura session data delete ho jata hai
    req.session.destroy((err) => {

        // ❌ Agar session destroy nahi hua
        // Server issue → 500 Internal Server Error
        if (err) {
            return res.status(500).json({
                error: "Error logging out"
            });
        }

        // ✅ Logout successful
        res.json({
            message: "Logout Successful"
        });
    });
};
