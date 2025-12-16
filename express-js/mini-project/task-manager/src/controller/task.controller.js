// 📦 File handling utilities import kar rahe hain
// readTasks → tasks.json se data read karega
// writeTasks → updated data wapas file me save karega
import { readTasks, writeTasks } from "../utils/file.utils.js";


// ✅ GET ALL TASKS CONTROLLER
// Ye function logged-in user ke saare tasks return karta hai
// Flow:
// 1️⃣ Check karega user authenticated hai ya nahi (session check)
// 2️⃣ File se saare tasks read karega
// 3️⃣ Sirf wahi tasks bhejega jo current user ke hain

export const getAllTask = async (req, res) => {

    // 🔐 AUTHENTICATION CHECK
    // Agar session me user hi nahi hai
    // matlab user login nahi hai
    if (!req.session.user) {
        return res.status(401).json({
            message: "Unauthenticated"
        });
    }

    // 📖 File se saare tasks read kar rahe hain
    const tasks = await readTasks();

    // 🧠 FILTER LOGIC
    // Sirf wahi tasks return honge
    // jo current logged-in user ke hain
    const userTasks = tasks.filter(
        (task) => task.username === req.session.user.username
    );

    // ✅ User-specific tasks response me bhej rahe hain
    res.json(userTasks);
};


// ✅ CREATE TASK CONTROLLER
// Ye function naya task create karta hai
// Flow:
// 1️⃣ Request body se title & description lega
// 2️⃣ Existing tasks file se read karega
// 3️⃣ Naya task object banayega
// 4️⃣ Task list me push karega
// 5️⃣ File me save karega

export const createTask = async (req, res) => {

    // 📥 Request body se data nikal rahe hain
    const { title, description } = req.body;

    // 📖 Pehle se existing tasks read kar rahe hain
    const tasks = await readTasks();

    // 🆕 New task object create kar rahe hain
    const newTask = {
        id: Date.now(), // unique ID (timestamp based)
        username: req.session.user.username, // task owner
        title, // task title
        description, // task description
        completed: false // default status
    };

    // ➕ New task ko tasks array me add kar rahe hain
    tasks.push(newTask);

    // 💾 Updated tasks ko file me save kar rahe hain
    await writeTasks(tasks);

    // ✅ Task created successfully
    // 201 → resource created
    res.status(201).json(newTask);
};


// 🛠️ UPDATE TASK CONTROLLER
// (Abhi empty hai)
// Future me:
// - task ID ke basis pe task find karna
// - sirf owner ko update allow karna
// - title / description / completed update karna
export const updateTask = () => {};


// 🗑️ DELETE TASK CONTROLLER
// (Abhi empty hai)
// Future me:
// - task ID ke basis pe delete karna
// - session user se match check karna
// - file ko update karna
export const deleteTask = () => {};
