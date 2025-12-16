import express from "express";

// 👇 Humnne alag file se Router import kiya.
// (Kyunki sara code ek file me likhne se 'Kichdi' ban jati hai, isliye code divide kiya)
import userRouter from "./routers/user.routes.js";

const app = express();

// ---------------------------------------------------------
// 🔗 ROUTER MOUNTING (Connecting the Pipes)
// ---------------------------------------------------------
// Logic: Is line ka matlab hai -> "Agar koi bhi URL '/api/v1/users' se shuru ho raha hai,
// toh usse turant 'userRouter' ke hawale kar do."
//
// 🏠 Real Life Analogy:
// Ye Mall ka Direction Board hai -> "Users Department jaane ke liye Idhar Jayein".
//
// 🧩 URL Kaise Banega?
// Main Path (Yahan se) + Sub Path (user.routes.js se)
// Example: "/api/v1/users" + "/create-user" = "/api/v1/users/create-user"
app.use("/api/v1/users" , userRouter);


// 👇 Ye simple Route hai (Testing ke liye ki server zinda hai ya nahi)
app.get("/" ,  (req, res) => {
    res.send("Hello World");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});