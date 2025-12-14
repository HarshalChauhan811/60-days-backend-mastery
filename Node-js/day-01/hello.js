// const maths = require("./math");
// Upar wali line me pura module import ho raha tha,
// par niche hum sirf specific functions ko destructure kar rahe hain.

const { AddFunc, SubFunc } = require("./math");
// Yahaan hum sirf woh functions import kar rahe hain jo chahiye —
// clean, optimized, aur professional tarika.

// Node.js me console.log fully supported hai:
console.log("Hello world i am node-js");

// console.log(window) ---> works in browsers only
// Kyuki 'window' ek browser ka global object hai,
// Node.js me yeh exist hi nahi karta.

// console.log(alert) ---> works in browsers only
// Alert bhi sirf browser ka feature hai, Node me nahi milega.
// Dono basically *client-side* cheezein hain.

// console.log("The value of module is ", maths(2,3))
// Agar tum pura module import karte to ye chalega,
// par AddFunc ko SubFunc override kar deta agar same naam hota.
// (Isliye destructuring sahi choice thi)

// Final output using our custom module functions:
console.log("The value of my module is",AddFunc(12, 34) + " and " + SubFunc(5, 2));
// Yahan hum dono functions ka result ek saath print kar rahe hain.
// Simple, readable, aur beginner-friendly output. 
