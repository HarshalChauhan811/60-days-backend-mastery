const fs = require("fs");
const os = require("os");

// os.cpus() → system ke CPU cores ki info deta hai.
// .length → kitne workers/machine cores available hain.
console.log(os.cpus().length); // Example: 4 cores/machines available.

// 🔥 SYNC = Blocking code
// 🔥 ASYNC = Non-blocking code (recommended for real servers)


// ========================
//  * WRITE FILE
// ========================

// Sync Write → Code yahin ruk jayega jab tak file write na ho jaye.
fs.writeFileSync("./text.txt", "Hey this is sync writing in the file");

// Async Write → Callback runtime ke hisaab se execute hota hai.
// Node.js isko background me kara deta hai → non-blocking behaviour.
fs.writeFile("./harshal.txt", "hello world i am async code", (err) => {
    console.log(err); // null aayega agar error nahi hua.
});


// ========================
//  * READ FILE
// ========================

// Sync Read → File read hone tak program ruk jata hai.
const res = fs.readFileSync("./harshal.txt", "utf8");
console.log(res);

// Async Read → Error ya data callback me milta hai.
fs.readFile("./harshal.txt", "utf-8", (error, response) => {
    if (error) {
        console.log(error);
    } else {
        console.log(response);
    }
});


// ========================
//  * UPDATE / APPEND
// ========================

// Sync Append → existing file ke end me data add kar deta hai.
fs.appendFileSync("./text.txt", new Date().toDateString());

// Async Append → recommended, non-blocking.
fs.appendFile(
    "./new.txt",
    `Hello world this is harshal and logged in at ${new Date().toDateString()}\n`,
    (err, res) => {
        if (err) console.log(err);
        else console.log(res); // undefined aayega kyuki appendFile kuch return nahi karta.
    }
);


// ========================
//  ⭐ EXTRA IMPORTANT METHODS ⭐
// ========================

// 1️⃣ cpSync(source, destination)
// → File ko copy karne ke liye use hota hai (sync version).
// Example:
// fs.cpSync("./text.txt", "./copy.txt");
// Isse text.txt ka duplicate ban jayega copy.txt naam se.


// 2️⃣ unlinkSync(path)
// → File ko delete kar deta hai.
// Example:
// fs.unlinkSync("./copy.txt");
// Yeh file ko permanently remove kar deta hai.


// 3️⃣ statSync(path)
// → File / folder ki details deta hai: size, created date, type, etc.
// Example:
// const info = fs.statSync("./text.txt");
// console.log(info.size); // file ka size
// console.log(info.isFile()); // true
// console.log(info.isDirectory()); // false


// 4️⃣ mkdirSync(path)
// → Naya folder create karta hai.
// Example:
// fs.mkdirSync("./harshalFolder");
// Agar folder already exists ho, error throw karega (unless options pass karo).
