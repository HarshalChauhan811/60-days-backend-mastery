import { Router } from "express";

// 👇 Router Instance Create Karna
// Socho Router ek 'Mini-App' hai jo sirf Users ki file sambhalega.
// Isse main 'app' (index.js) par load kam ho jata hai.
const userRouter = Router();

// rotes ko group kar diya alag file me code maintanable ho gya 
// (Fayda: Kal ko Users me error aaya, to pura server check nahi karna padega, bas ye file dekhni hogi)

// ---------------------------------------------------------
// 🛣️ ROUTE DEFINITIONS
// ⚠️ Magic Note: In sab routes ke aage '/api/v1/users' apne aap jud jayega 
// (Kyunki index.js me humne app.use('/api/v1/users', ...) likha tha)
// ---------------------------------------------------------

userRouter.get("/create-user", (req, res) => {
    // 🔗 Final URL banega: localhost:3000/api/v1/users/create-user
    res.send("Users Page");
});

userRouter.get("/getAllUser" , (req, res) => {
    // 🔗 Final URL banega: localhost:3000/api/v1/users/getAllUser
    res.send("Get All Users");
});

userRouter.get("/getUserById" , (req, res) => {
    // 🔗 Final URL banega: localhost:3000/api/v1/users/getUserById
    res.send("Get User By Id");
})


// 👇 Export kar rahe hain taaki main server (index.js) isko import karke connect kar sake.
export default userRouter;