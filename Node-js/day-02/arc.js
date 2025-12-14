// CPU Intensive task karege --> Password Hashing
// Ye example Node.js ke THREAD POOL behavior ko samjhane ke liye hai

// UV_THREADPOOL_SIZE ko sabse pehle set karna zaroori hota hai
// Ye batata hai ki libuv thread pool me kitne workers honge
process.env.UV_THREADPOOL_SIZE = require('os').cpus().length; 
// 👆 Max size theoretically 128 tak ja sakta hai
// Isse hum CPU intensive tasks ke liye workers increase kar sakte hain

// crypto module import kar rahe hain
// IMPORTANT: hamesha UV_THREADPOOL_SIZE set karne ke baad import kare
const crypto = require("crypto");

// Program start hone ka time store
let start = Date.now();

// ---- CPU INTENSIVE TASKS START ----
// pbkdf2 → password hashing
// Ye event loop me nahi, balki THREAD POOL me chalta hai

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  // Ye batata hai kitne milliseconds me task complete hua
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

// Default case me Node.js ke paas 4 workers hote hain
// Isliye pehle 4 tasks parallel chal jaate hain
// 5th task ko wait karna padta hai jab tak koi worker free na ho

crypto.pbkdf2("password-1", "salt1", 100000, 1024, "sha512", () => {
  console.log(`${Date.now() - start}ms Done`);
});

// Current thread pool size print kar rahe hain
console.log('UV_THREADPOOL_SIZE:', process.env.UV_THREADPOOL_SIZE);







// ---------------- EVENT LOOP EXAMPLE (COMMENTED) ----------------

// fs module import (I/O operations ke liye)
// const fs =require("fs");

// setImmediate → CHECK phase me execute hota hai
// setImmediate(()=>{console.log("Hello from Immediate fn");});

// setTimeout with 0ms
// Ye TIMERS phase me jata hai
// setTimeout(()=>{
//   console.log("Hello from setTimeOut");
// },0); // expired timer callback   

// IMPORTANT NOTE:
// setTimeout(0) aur setImmediate ka execution order FIXED nahi hota
// Kabhi setImmediate pehle chalega, kabhi setTimeout
// Ye system + execution context par depend karta hai

// console.log synchronous hai
// Ye sabse pehle execute hota hai
// console.log(('Hellow Harshal'));

// Execution Priority (normally):
// 1️⃣ Synchronous console.log
// 2️⃣ setTimeout (timers phase)
// 3️⃣ setImmediate (check phase)
// ❌ But ye order guaranteed nahi hota
