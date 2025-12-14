/******************** PART 1: EVENT LOOP + ASYNC CONCEPT (LEARNING PART) ********************/

// File system module → files read/write ke liye use hota hai
// const fs = require("fs");

// Crypto module → CPU intensive tasks (hashing, encryption) ke liye
// const crypto = require("crypto");

// Program start hone ka time note kar rahe hain
// const start = Date.now();

// setImmediate → event loop ke CHECK phase me execute hota hai
// setImmediate(() => console.log("Hello from setImmediate"));

// Async I/O operation → POLL phase me jata hai
// fs.readFile("sample.txt", "utf-8", () => {
//   console.log("IO polling");

//   // 0ms timer → TIMERS phase
//   setTimeout(() => {
//     console.log("hello from timer 2");
//   }, 0);

//   // 5 seconds delay wala timer
//   setTimeout(() => {
//     console.log("hello from timer 3");
//   }, 5 * 1000);

//   // I/O ke andar setImmediate → usually timer se pehle chalega
//   setImmediate(() => console.log("Hello from setImmediate 2"));

//   // 6 CPU heavy tasks ban rahe hain
//   const tasks = Array.from({ length: 6 }, (_, i) => `password${i + 1}`);

//   // pbkdf2 → thread pool me execute hota hai (default size = 4)
//   tasks.forEach((password) => {
//     crypto.pbkdf2(password, "salt1", 100000, 1024, "sha512", () => {
//       console.log(`${Date.now() - start}ms`, `${password} Done`);
//     });
//   });
// });

// 0ms ka top-level timer
// setTimeout(() => console.log("Hello from timer 1"), 0);

// Synchronous code → sabse pehle execute hota hai
// console.log("Hello from top level code");


/******************** PART 2: NODE.JS SERVER (REAL PROJECT) ********************/

// http module → server banane ke liye
const http = require("http");

// fs module → logs file me store karne ke liye
const fs = require("fs");

// Server ka port define kar rahe hain
const PORT = 5000;

// HTTP server create ho raha hai
const myServer = http.createServer((request, response) => {

  // Har request ka log prepare kar rahe hain
  // Date.now() → request ka time
  // request.url → kaunsi URL hit hui
  const Log = `${Date.now()}: From ${request.url} New Request Received\n`;

  // appendFile → file me data add karta hai (non-blocking)
  fs.appendFile("log.txt", Log, (err) => {

    // Agar file write me error aayi
    if (err) {
      console.log("Error writing to the log file", err);

      // Client ko error response
      response.statusCode = 500;
      response.end("Internal Server Error");
      return;
    }

    // Sab sahi raha to client ko response
    response.end("Hello World from Server");
  });
});

// Server start ho raha hai
myServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
