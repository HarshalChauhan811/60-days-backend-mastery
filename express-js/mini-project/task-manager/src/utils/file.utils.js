// 📦 File System module
// Files ko read / write / create karne ke kaam aata hai
import fs from "fs";

// 📍 Path module
// File aur folder ke correct paths banane ke liye
import path from "path";

// 🔄 ES Module me __dirname directly available nahi hota
// isliye import.meta.url se current file ka path nikalte hain
import { fileURLToPath } from "url";


// 🔹 Current file ka absolute path nikal rahe hain
// Example: C:/project/utils/file.js
const __filename = fileURLToPath(import.meta.url);

// 🔹 Current directory ka path nikal rahe hain
// Example: C:/project/utils
const __dirname = path.dirname(__filename);


// 📁 tasks.json file ka final path
// Example: C:/project/utils/data/tasks.json
const filePath = path.join(__dirname, "data", "tasks.json");


// ✅ TASKS READ FUNCTION
// Ye function tasks.json file se saare tasks read karta hai
// Flow:
// 1️⃣ Pehle ensure karta hai ki file exist karti ho
// 2️⃣ File ko sync way me read karta hai
// 3️⃣ JSON string ko JS array/object me convert karta hai
// 4️⃣ Error aaye to empty array return karta hai

export const readTasks = () => {
  try {

    // 🧠 Safety check:
    // Agar file ya folder exist nahi karta
    // to pehle create kar dega
    ensureFileExists();

    // 📖 File ka data read kar rahe hain (UTF-8 text format)
    const data = fs.readFileSync(filePath, "utf-8");

    // 🔄 JSON string ko JS array me convert kar rahe hain
    // Agar file empty ho to default empty array return
    return JSON.parse(data || "[]");

  } catch (error) {

    // ❌ Agar file read karte waqt koi error aaye
    console.error("Error reading tasks:", error);

    // App crash na ho — safe empty array return
    return [];
  }
};


// ✅ TASKS WRITE FUNCTION
// Ye function tasks array ko JSON file me save karta hai
// Flow:
// 1️⃣ JS array/object ko JSON string me convert karta hai
// 2️⃣ Pretty format (indentation) ke sath file me likhta hai
// 3️⃣ Error aaye to sirf log karta hai

export const writeTasks = (tasks) => {
  try {

    // ✍️ File me data write kar rahe hain
    // null, 2 → JSON ko readable format me likhne ke liye
    fs.writeFileSync(
      filePath,
      JSON.stringify(tasks, null, 2),
      "utf-8"
    );

  } catch (error) {

    // ❌ Agar write operation fail ho jaye
    console.error("Error writing tasks:", error);
  }
};


// 🛡️ FILE & DIRECTORY SAFETY FUNCTION
// Ye function ensure karta hai ki:
// ✅ data folder exist kare
// ✅ tasks.json file exist kare
// ❌ Agar na ho to automatically create ho jaye

const ensureFileExists = () => {
  try {

    // 🔍 Check kar rahe hain ki file exist karti hai ya nahi
    if (!fs.existsSync(filePath)) {

      // 📁 Agar folder exist nahi karta
      // recursive:true → nested folders bhi create ho jaayenge
      fs.mkdirSync(path.dirname(filePath), {
        recursive: true
      });

      // 🆕 Empty JSON file create kar rahe hain
      // Default value = empty array
      fs.writeFileSync(filePath, "[]", "utf-8");
    }

  } catch (error) {

    // ❌ Agar folder ya file create karte waqt issue aaye
    console.error("Error ensuring file exists:", error);
  }
};



// 🧠 Real-Life Example (Easy Recall)

// Socho Todo App:

// readTasks() → notebook khol ke likhe hue tasks padhna

// writeTasks() → naye tasks likhna

// ensureFileExists() → notebook hi na ho to pehle banana

// 🎯 Interview Ready Points

// fs.readFileSync → blocking I/O (small projects ke liye ok)

// JSON.parse() → string → object

// JSON.stringify() → object → string

// recursive: true → nested folders auto create

// ES Modules me __dirname manually banana padta hai