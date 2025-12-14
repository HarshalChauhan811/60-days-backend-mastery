// !OBJECTIVE
// * CREATE A PROGRAM USING NODE-JS EVENTEMITTER THAT:

// ? LISTENS FOR MULTIPLE TYPES OF USER EVENTS (LOGIN, LOGOUT, PURCHASE, PROFILE UPDATE) ✅
// ? TRACKS HOW MANY TIMES EACH EVENT IS EMITTED.
// ? LOGS A SUMMARY OF ALL EVENTS OCCURRENCES WHEN A SPECIAL SUMMARY EVENT IS TRIGGERED


// !REQUIREMENT
// ? create at least four custom events
// ? emit these events multiple times with different arguments
// ? track and store the count of each event type
// ? define a summary event that logs a detailed report


// ===============================
// 📦 Imports
// ===============================

const EventEmitter = require("events")
const fs = require("fs")


// ===============================
// 🔔 EventEmitter Instance
// ===============================

const userEmitter  = new EventEmitter()


// ===============================
// 📊 Event Count Tracker
// ===============================

// Ye object har event ka count maintain karega
const eventCounts = {
    login: 0,
    logout: 0,
    purchase: 0,
    profileupdate: 0
}


// ===============================
// 📁 Persistent Log File
// ===============================

// Problem: server restart hone par count reset ho jata hai
// Solution: counts ko file me store karna (simple persistence)
const logFile = "eventlog.json"


// Agar pehle se file exist karti hai → data load kar lo
if (fs.existsSync(logFile)) {
    const data = fs.readFileSync(logFile, "utf-8")
    Object.assign(eventCounts, JSON.parse(data))
}


// File me updated counts save karne ka function
function saveCounts() {
    fs.writeFileSync(logFile, JSON.stringify(eventCounts, null, 2))
}


// ===============================
// 🧠 Utility: Timestamp Generator
// ===============================

function getTime() {
    return new Date().toLocaleString()
}


// ===============================
// 🎯 Event Listeners (CREATE EVENTS)
// ===============================

// LOGIN EVENT
userEmitter.on("LOGIN", (username) => {
    eventCounts.login++
    console.log(`[${getTime()}] ${username} Logged In Successfully ✅`)
    saveCounts()
})


// LOGOUT EVENT
userEmitter.on("LOGOUT", (username) => {
    eventCounts.logout++
    console.log(`[${getTime()}] ${username} Logged Out Successfully ❌`)
    saveCounts()
})


// PURCHASE EVENT
userEmitter.on("PURCHASE", (username, item) => {
    eventCounts.purchase++
    console.log(`[${getTime()}] ${username} purchased ${item} 🛒`)
    saveCounts()
})


// PROFILE UPDATE EVENT
userEmitter.on("PROFILE_UPDATE", (username, field) => {
    eventCounts.profileupdate++
    console.log(`[${getTime()}] ${username} updated profile field: ${field} ✏️`)
    saveCounts()
})


// ===============================
// 📄 SUMMARY EVENT
// ===============================

// Ye event complete analytics report print karega
userEmitter.on("SUMMARY", () => {
    console.log("\n📊 EVENT SUMMARY REPORT")
    console.log("----------------------------")
    console.log(`Total Logins        : ${eventCounts.login}`)
    console.log(`Total Logouts       : ${eventCounts.logout}`)
    console.log(`Total Purchases     : ${eventCounts.purchase}`)
    console.log(`Profile Updates     : ${eventCounts.profileupdate}`)
    console.log("----------------------------\n")
})


// ===============================
// ♻️ RESET SUMMARY EVENT (ADDED)
// ===============================

// Admin type event → saare counters reset
userEmitter.on("RESET_SUMMARY", () => {
    eventCounts.login = 0
    eventCounts.logout = 0
    eventCounts.purchase = 0
    eventCounts.profileupdate = 0

    saveCounts()
    console.log("⚠️ All event counts have been reset successfully")
})


// ===============================
// ❌ ERROR EVENT (BEST PRACTICE)
// ===============================

// Agar error event handle nahi kiya → app crash ho sakta hai
userEmitter.on("error", (err) => {
    console.log("❌ System Error:", err.message)
})


// ===============================
// 🚀 EMIT EVENTS (EXECUTION)
// ===============================

// Different users + different data
userEmitter.emit("LOGIN", "Harshal")
userEmitter.emit("PURCHASE", "Harshal", "iPhone 16")
userEmitter.emit("PROFILE_UPDATE", "Harshal", "Email Address")
userEmitter.emit("LOGOUT", "Harshal")

userEmitter.emit("LOGIN", "Aman")
userEmitter.emit("PURCHASE", "Aman", "MacBook M3")

// Summary call
userEmitter.emit("SUMMARY")

// Optional reset (uncomment to test)
// userEmitter.emit("RESET_SUMMARY")

// Error simulation
// userEmitter.emit("error", new Error("Database connection failed"))
