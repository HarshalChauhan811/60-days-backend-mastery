/******************************************************************
 🔥 EXPRESS SERVER – CRUD OPERATIONS (BEGINNER FRIENDLY VERSION)
 🔥 Language: Hinglish
 🔥 Concepts Covered:
    - Express basics
    - Middleware
    - GET / POST / PUT / PATCH / DELETE
    - Query Params & Route Params
    - filter(), find(), findIndex()
    - Spread Operator (...)
******************************************************************/

/* =========================
   EXPRESS IMPORT
   ========================= */

// Express ko import kar rahe hai
// NOTE: ES Module syntax use ho rahi hai
// Isliye package.json me "type": "module" hona compulsory hai
import express from "express";

/* =========================
   DUMMY DATABASE IMPORT
   ========================= */

// Ye ek normal JS array hai jo users ka data store karta hai
// Real projects me yahi jagah MongoDB / SQL hota hai
import userData from "./data/data.js";

/* =========================
   APP INITIALIZATION
   ========================= */

// Express ka instance bana rahe hai
const app = express();

/* =========================
   MIDDLEWARE
   ========================= */

// express.json() middleware
// Ye middleware request body ko JSON me convert karta hai
// Agar ye nahi likhenge → req.body undefined milega
app.use(express.json());

/* =========================
   SERVER PORT
   ========================= */

const PORT = 8080;

/* ==========================================================
   1️⃣ GET REQUEST → DATA FETCH KARNE KE LIYE
   ========================================================== */

/* ----------------------------------------------------------
   ROOT ROUTE
   ---------------------------------------------------------- */

// Server alive hai ya nahi check karne ke liye
app.get("/", (req, res) => {
  res.status(200).send("Hello! World");
});

/* ----------------------------------------------------------
   GET ALL USERS + QUERY PARAMS
   ---------------------------------------------------------- */

/*
 👉 Query Params kya hote hai?
    URL ke end me ? ke baad jo data jata hai

    Example:
    /api/v1/users?name=Harshal
*/

app.get("/api/v1/users", (req, res) => {

  // req.query se query params milte hai
  const { name } = req.query;

  // Agar user ne name query bheji hai
  if (name) {

    // filter() array ka method hai
    // Ye saare matching users return karta hai
    const user = userData.filter((user) => {
      return user.name === name;
    });

    // Matching user bhej do
    return res.status(200).send(user);
  }

  // Agar query param nahi aaya
  // To saare users bhej do
  res.status(200).send(userData);
});

/* ----------------------------------------------------------
   GET USER BY ID (ROUTE PARAMS)
   ---------------------------------------------------------- */

/*
 👉 Route Params kya hote hai?
    URL ke andar dynamic value

    Example:
    /api/v1/users/3
*/

app.get("/api/v1/users/:id", (req, res) => {

  // req.params se route params milte hai
  const { id } = req.params;

  // URL se aane wali id hamesha STRING hoti hai
  // Isliye number me convert karna zaruri hai
  const parsedId = parseInt(id);

  // find() sirf pehla matching element return karta hai
  const user = userData.find(
    (user) => user.id === parsedId
  );

  // User return kar rahe hai
  res.status(200).send(user);
});

/* ==========================================================
   2️⃣ POST REQUEST → NEW DATA CREATE KARNE KE LIYE
   ========================================================== */

/*
 👉 POST kab use hota hai?
    Jab server me naya data bhejna ho
*/

app.post("/api/v1/users", (req, res) => {

  // req.body me frontend se bheja gaya data hota hai
  const { name, displayname } = req.body;

  // Naya user object bana rahe hai
  const newUser = {
    id: userData.length + 1, // simple auto increment
    name,
    displayname,
  };

  // Data ko array me add kar rahe hai
  userData.push(newUser);

  // 201 → Successfully created
  res.status(201).send({
    message: "User Created",
    data: newUser,
  });
});

/* ==========================================================
   3️⃣ PUT REQUEST → POORA OBJECT UPDATE
   ========================================================== */

/*
 👉 PUT ka rule:
    Poora object replace hota hai
*/

app.put("/api/v1/users/:id", (req, res) => {

  // body aur id dono chahiye
  const { body, params: { id } } = req;

  const parsedId = parseInt(id);

  // findIndex() → user ka index return karta hai
  const userIndex = userData.findIndex(
    (user) => user.id === parsedId
  );

  // Agar user exist nahi karta
  if (userIndex === -1) {
    return res.status(404).send("User Not Found");
  }

  // Existing object ko completely replace kar rahe hai
  userData[userIndex] = {
    id: parsedId,
    ...body, // Spread operator
  };

  res.status(201).send({
    message: "User Updated",
    data: userData[userIndex],
  });
});

/* ==========================================================
   4️⃣ PATCH REQUEST → SPECIFIC FIELD UPDATE
   ========================================================== */

/*
 👉 PATCH ka rule:
    Sirf wahi field update hoti hai
    Jo body me bheji jati hai
*/

app.patch("/api/v1/users/:id", (req, res) => {

  const { body, params: { id } } = req;

  const parsedId = parseInt(id);

  const userIndex = userData.findIndex(
    (user) => user.id === parsedId
  );

  if (userIndex === -1) {
    return res.status(404).send("User Not Found");
  }

  // Old data ko preserve kar rahe hai
  // Aur sirf new fields update
  userData[userIndex] = {
    ...userData[userIndex], // old data
    ...body,                // updated fields
  };

  res.status(201).send({
    message: "User Updated",
    data: userData[userIndex],
  });
});

/* ==========================================================
   5️⃣ DELETE REQUEST → DATA DELETE
   ========================================================== */

/*
 👉 DELETE ka kaam:
    Server se data permanently remove karna
*/

app.delete("/api/v1/users/:id", (req, res) => {

  const { id } = req.params;
  const parsedId = parseInt(id);

  // Pehle check kar rahe hai user exist karta hai ya nahi
  const userToDelete = userData.find(
    (user) => user.id === parsedId
  );

  if (!userToDelete) {
    return res.status(404).send({
      message: "User Not Found",
    });
  }

  // filter() → user ko remove kar deta hai
  const updatedUsers = userData.filter(
    (user) => user.id !== parsedId
  );

  // Original array ko update kar rahe hai
  userData.length = 0;
  userData.push(...updatedUsers); // spread operator

  res.status(200).send({
    message: "User Deleted Successfully",
    deletedUser: userToDelete,
  });
});

/* ==========================================================
   SERVER START
   ========================================================== */

// Server start kar rahe hai
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
