# 🚀 Node.js Core Concepts — Path Module & EventEmitter (Complete Notes)

> **Language:** Hinglish\
> **Level:** Beginner → Intermediate (Interview Ready)\
> **Focus:** Theory + Real Code (No fluff)

---

## 📦 PART 1: Node.js Global Objects & Path Module

### 🔹 CommonJS Globals

Node.js me kuch cheeze by default available hoti hain, import karne ki zarurat nahi hoti.

- `__filename` → current file ka **complete path**
- `__dirname` → current file ka **folder path**

👉 Ye **sirf CommonJS** (`require`) me hote hain.

```javascript
const path = require("path");

console.log("FILENAME📂", __filename);
console.log("DIRNAME📂", __dirname);
```

---

### 🔹 Real-Life Example (School Management System)

Task mila hai:

```
folder/students/data.txt
```

Is path ko safely handle karna hai (Windows + Mac dono me).

---

### 1️⃣ `path.join()` — Safe Path Builder

```javascript
const filepath = path.join("folder", "students", "data.txt");
console.log(filepath);
```

✅ OS independent\
✅ `/` ya `\\` ka tension nahi

---

### 2️⃣ Path Utilities (Very Important)

```javascript
const parsedDataPath = path.parse(filepath);
const resolvedPath = path.resolve(filepath);
const extname = path.extname(filepath);
const basename = path.basename(filepath);
const dirname = path.dirname(filepath);

console.log({
  parsedDataPath,
  resolvedPath,
  extname,
  basename,
  dirname
});
```

| Method       | Kaam                     |
| ------------ | ------------------------ |
| `parse()`    | path ka full breakdown   |
| `resolve()`  | absolute path banata hai |
| `extname()`  | file extension           |
| `basename()` | file name                |
| `dirname()`  | parent folder            |

🧠 **Interview Line:** `path.join()` for building, `path.resolve()` for absolute paths.

---

## ⚡ PART 2: EventEmitter — Basics

### 🔹 Client vs Server Events

- **Client Side:** button click, scroll, input
- **Server Side:** request aana, file read hona, DB response

Node.js me events handle karne ke liye:

```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();
```

---

### 🔑 2 Core Methods

- `on(eventName, listener)` → event listen/create
- `emit(eventName, args)` → event fire

---

### 🧪 Basic GREET Event

```javascript
emitter.on("GREET", (args) => {
  console.log(`Hello World ${args.username} and id is ${args.id}`);
});

emitter.emit("GREET", {
  username: "Harshal",
  id: "10asldhasildh9021873nlkasc"
});
```

🧠 **Flow:**\
Event create → Listener register → Event emit → Listener execute

---

### ⭐ Extra Concepts

```javascript
// Multiple listeners
emitter.on("GREET", () => console.log("Second listener"));

// once → sirf ek baar
emitter.once("LOGIN", (user) => console.log(`Welcome ${user}`));

// error event (must handle)
emitter.on("error", (err) => {
  console.log("Error:", err.message);
});
```

---

## 🏗️ PART 3: Advanced EventEmitter Project

### 🎯 Objective

- Multiple custom events
- Event count tracking
- Persistent storage (file)
- Summary report

---

### 📦 Setup

```javascript
const EventEmitter = require("events");
const fs = require("fs");

const userEmitter = new EventEmitter();
```

---

### 📊 Event Counter Object

```javascript
const eventCounts = {
  login: 0,
  logout: 0,
  purchase: 0,
  profileupdate: 0
};
```

---

### 💾 Persistence (File Storage)

```javascript
const logFile = "eventlog.json";

if (fs.existsSync(logFile)) {
  const data = fs.readFileSync(logFile, "utf-8");
  Object.assign(eventCounts, JSON.parse(data));
}

function saveCounts() {
  fs.writeFileSync(logFile, JSON.stringify(eventCounts, null, 2));
}
```

👉 Server restart ke baad bhi count safe rahega.

---

### ⏱️ Timestamp Utility

```javascript
function getTime() {
  return new Date().toLocaleString();
}
```

---

### 🔔 Custom Events

```javascript
userEmitter.on("LOGIN", (username) => {
  eventCounts.login++;
  console.log(`[${getTime()}] ${username} logged in ✅`);
  saveCounts();
});

userEmitter.on("LOGOUT", (username) => {
  eventCounts.logout++;
  console.log(`[${getTime()}] ${username} logged out ❌`);
  saveCounts();
});

userEmitter.on("PURCHASE", (username, item) => {
  eventCounts.purchase++;
  console.log(`[${getTime()}] ${username} purchased ${item} 🛒`);
  saveCounts();
});

userEmitter.on("PROFILE_UPDATE", (username, field) => {
  eventCounts.profileupdate++;
  console.log(`[${getTime()}] ${username} updated ${field}`);
  saveCounts();
});
```

---

### 📄 SUMMARY Event

```javascript
userEmitter.on("SUMMARY", () => {
  console.log("\n📊 EVENT SUMMARY");
  console.log(`Logins: ${eventCounts.login}`);
  console.log(`Logouts: ${eventCounts.logout}`);
  console.log(`Purchases: ${eventCounts.purchase}`);
  console.log(`Profile Updates: ${eventCounts.profileupdate}`);
});
```

---

### 🚀 Emit Events

```javascript
userEmitter.emit("LOGIN", "Harshal");
userEmitter.emit("PURCHASE", "Harshal", "iPhone 16");
userEmitter.emit("PROFILE_UPDATE", "Harshal", "Email");
userEmitter.emit("LOGOUT", "Harshal");

userEmitter.emit("SUMMARY");
```

---

## 🧠 Final Interview Cheat Sheet

- `path` module → OS-independent file paths
- `EventEmitter` → backbone of Node.js
- HTTP, Streams, fs → sab EventEmitter based
- Events are **synchronous**
- File persistence = basic state management

---





