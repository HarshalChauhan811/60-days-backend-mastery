// Node.js ka built-in module
// EventEmitter → events create + handle karne ke kaam aata hai
const EventEmitter = require("events")

// ===============================
// 🔁 Client vs Server Events
// ===============================

// Client Side:
// Events user ke actions par depend hote hain
// ex: button click, input change, scroll, hover

// Server Side (Node.js):
// Events system ke actions par depend hote hain
// ex: request aayi, file read hui, DB response aaya, error aaya


// ===============================
// 📦 EventEmitter ka instance
// ===============================

// EventEmitter ek class hai
// hum uska instance bana rahe hain
const emitter  = new EventEmitter()


// ===============================
// 🔑 EventEmitter ke 2 MOST IMPORTANT methods
// ===============================

// 1️⃣ on(eventName, listener)
// → event CREATE / LISTEN karne ke liye

// 2️⃣ emit(eventName, [args])
// → event FIRE / EXECUTE karne ke liye


// ===============================
// 🎯 Basic Example (GREET Event)
// ===============================

// Hume chahiye:
// jab "GREET" event emit ho
// tab "Hello World" print ho with user data

// emitter.on() → event listener register karta hai
// eventName + callback (listener)
emitter.on("GREET", (args) => {
    console.log(`Hello World ${args.username} and the id is ${args.id}`)
})


// emitter.emit() → event ko execute karta hai
// eventName + data (arguments)
emitter.emit("GREET", {
    username: "Harshal",
    id: "10asldhasildh9021873nlkasc"
})


// ======================================================
// ➕ ADDITIONAL IMPORTANT CONCEPTS (REAL SERVER USE)
// ======================================================


// ===============================
// 1️⃣ Multiple listeners for SAME event
// ===============================

// Ek hi event ke multiple listeners ho sakte hain
emitter.on("GREET", () => {
    console.log("👋 Second listener bhi chal gaya")
})

// Jab emit hoga → dono listeners run honge
emitter.emit("GREET", {
    username: "Harshal",
    id: "SECOND-CALL"
})


// ===============================
// 2️⃣ emitter.once()
// ===============================

// once() → event sirf EK BAAR chalega
// Use case: welcome email, OTP send, first-time login

emitter.once("LOGIN", (user) => {
    console.log(`Welcome ${user}, this will run only once`)
})

emitter.emit("LOGIN", "Harshal") // chalega
emitter.emit("LOGIN", "Harshal") // ❌ nahi chalega


// ===============================
// 3️⃣ removeListener / off()
// ===============================

// Kabhi-kabhi event listener hatana padta hai
const logoutHandler = () => {
    console.log("User logged out")
}

emitter.on("LOGOUT", logoutHandler)

// listener remove
emitter.off("LOGOUT", logoutHandler)

emitter.emit("LOGOUT") // ❌ kuch print nahi hoga


// ===============================
// 4️⃣ ERROR Event (VERY IMPORTANT)
// ===============================

// Node.js me "error" event special hota hai
// Agar error event handle nahi kiya → app crash ho sakta hai 😵

emitter.on("error", (err) => {
    console.log("❌ Error occurred:", err.message)
})

// error emit
emitter.emit("error", new Error("Database connection failed"))


// ===============================
// 🧠 REAL LIFE SERVER ANALOGY
// ===============================

// Event Name        → "request"
// Listener          → controller / handler
// emit()            → client ne request bheji
// args              → req, res object

// Example thinking:
// emitter.emit("REQUEST_RECEIVED", req)


// ===============================
// 🎯 INTERVIEW GOLD LINES
// ===============================

// 🔹 EventEmitter is used heavily inside Node.js core
// 🔹 Streams, HTTP server, process, fs → sab EventEmitter par based hain
// 🔹 emit() sync hota hai (listeners turant execute hote hain)
// 🔹 once() = memory safe for one-time events
