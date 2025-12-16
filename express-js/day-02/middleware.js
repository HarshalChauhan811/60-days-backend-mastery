import express from "express";

const app = express();

// ---------------------------------------------------------
// 🛡️ MIDDLEWARE DEFINITION (Ye Hamara Security Guard Hai)
// Logic: Request aane aur Response bhejne ke 'BEECH' (Middle) ka function.
// ---------------------------------------------------------
function SayHiMiddleware(req , res , next ){
    console.log("Hi I am middleware👋");
    
    // 👇 SABSE IMPORTANT LINE:
    // next() ka matlab: "Mera checking ka kaam ho gaya, ab request ko aage (Next function/Route) bhejo."
    // Agar next() nahi likha, to website ghoomti rahegi (Loading...) par khulegi nahi.
    next(); 
}

// ---------------------------------------------------------
// 1️⃣ TYPE 1: GLOBAL MIDDLEWARE (Main Gate)
// ---------------------------------------------------------
// app.use(SayHiMiddleware);   
// 👆 Agar isko uncomment kar diya, to ye 'Application Level' middleware ban jayega.
// Matlab: Koi bhi page kholo (/users, /home), ye guard sabko check karega.


// ---------------------------------------------------------
// 2️⃣ TYPE 2: SPECIFIC ROUTE MIDDLEWARE (VIP Gate)
// ---------------------------------------------------------
// 👇 Notice karo: 'SayHiMiddleware' ko humne beech mein likha hai.
// Flow: User aaya -> Middleware chala (Log hua) -> next() ne dhakka diya -> Response mila ("Hello World").
app.get("/", SayHiMiddleware ,  (req, res) => {    
    res.send("Hello World");
});

// 👇 Is route par koi middleware nahi hai. (Direct Entry).
// Agar tum '/users' khologe, to console me "Hi I am middleware" print NAHI hoga.
app.get("/users", (req, res) => {
    res.send("Users Page");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// ---------------------------------------------------------
// 📚 REVISION: Middleware ke Types
// ---------------------------------------------------------
// 1. Global Middleware ✅ 
//    -> (app.use se lagta hai, puri app par apply hota hai).
//
// 2. Specific Routes Middleware ✅ 
//    -> (Sirf usi route par chalta hai jahan pass kiya gaya ho, jaise '/' par).
//
// 3. Inbuilt Middleware 🛠️ 
//    -> (Express ke apne tools. Example: app.use(express.json()) -> Ye body se data nikalne ke kaam aata hai).