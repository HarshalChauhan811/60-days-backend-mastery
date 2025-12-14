// Node.js ka built-in module
// path module → file & folder paths ko handle karne ke liye use hota hai
const path = require("path");


// __filename → current file ka COMPLETE path deta hai (file name ke saath)
console.log("FILENAME📂", __filename);

// __dirname → current file ka sirf folder (directory) path deta hai
// ⚠️ Ye dono sirf CommonJS me available hote hain (require system)
console.log("DIRNAME📂", __dirname);   // ye sab common js me hote hai 


// ===============================
// 🏫 School Management System (Example)
// ===============================

// Assume karo tumhe task mila hai:
// folders/students/data.txt   --> is path ko handle karna hai


// ===============================
// 1️⃣ path.join()
// ===============================

// path.join() → multiple folder/file names ko safely join karta hai
// 👉 Forward slash (/) ya backward slash (\) ka tension nahi
// 👉 Windows + Mac + Linux sab me same kaam karega

const filepath = path.join("folder", "students", "data.txt");

// Output example (OS ke hisaab se):
// Windows → folder\students\data.txt
// Mac/Linux → folder/students/data.txt

console.log(filepath);


// ===============================
// 2️⃣ path.parse()
// ===============================

// path.parse() → poore path ko tod deta hai parts me
// root, dir, base, name, ext sab alag-alag milta hai
const parsedDataPath = path.parse(filepath);


// ===============================
// 3️⃣ path.resolve()
// ===============================

// path.resolve() → relative path ko absolute path me convert karta hai
// Ye __dirname se start karke final full path bana deta hai
const resolvedPath = path.resolve(filepath);


// ===============================
// 4️⃣ path.extname()
// ===============================

// path.extname() → file ka extension deta hai
// Yaha ".txt" milega
const extname = path.extname(filepath);


// ===============================
// 5️⃣ path.basename()
// ===============================

// path.basename() → sirf file ka naam deta hai
// data.txt
const basename = path.basename(filepath);


// ===============================
// 6️⃣ path.dirname()
// ===============================

// path.dirname() → file ke parent folder ka path deta hai
// folder/students
const dirname = path.dirname(filepath);


// ===============================
// 📦 Sab output ek saath dekhne ke liye
// ===============================

console.log({
    parsedDataPath, // path ka full breakdown
    resolvedPath,   // absolute path
    extname,        // file extension
    basename,       // file name
    dirname         // directory path
});


// ===============================
// 🔁 JSON Concepts (Backend me bahut common)
// ===============================

// JSON.stringify()
// 👉 JavaScript Object → JSON string
// 👉 Data ko file, DB ya network me bhejne ke kaam aata hai

// JSON.parse()
// 👉 JSON string → JavaScript Object
// 👉 Server se aaya data JS me use karne ke liye

// 💡 Interview Line:
// "Stringify = pack data, Parse = unpack data"
