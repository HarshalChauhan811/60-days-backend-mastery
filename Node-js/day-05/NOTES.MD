# 🧠 NODE.JS CORE MASTER NOTES

## **OS MODULE + CRYPTO MODULE**

### *(First Principles • Real-Life Examples • Complete Theory • Fully Commented Code )*

---

## 📌 HOW TO USE THESE NOTES

- Ye notes **edit-friendly** hain (Markdown)
- Tum isse **direct edit / download / print** kar sakte ho
- Beginner → Internship → Interview level tak sufficient
- Har section me **pehle theory (WHY)**, phir **code (HOW)** diya gaya hai
- Agar pehli baar padh rahe ho, to sirf headings + bullet points bhi enough clarity denge

---

# 🔷 PART 1: OS MODULE

## *(System Awareness – First Principles Approach)*

---

## 🧠 FIRST THOUGHT: OS MODULE KYON ZAROORI HAI?

Node.js directly **hardware + operating system** ke upar run karta hai.
Server koi magic cheez nahi hai — wo bhi ek normal machine hoti hai.

Agar server ko ye nahi pata:

- kis OS pe run ho raha hai
- CPU cores kitne hain
- RAM kitni free / total hai
- Network interfaces kaun se hain

👉 to wo **smart decisions nahi le sakta** (jaise load handle karna, scaling, ya crash se bachna).

### 🌍 Real-Life Analogy

Socho tum car drive kar rahe ho 🚗
Agar tumhe dashboard pe ye na dikhe:

- fuel kitna hai
- speed kya hai
- engine temperature kya hai

👉 tum andaza se drive karoge — accident almost confirm.

**OS module = server ka dashboard.**

---

## 📦 OS MODULE IMPORT

```js
const os = require("os");
// Node.js ka built-in module
// System (OS + Hardware) ki information deta hai
// Koi npm install ki zarurat nahi
```

---

## 1️⃣ OS PLATFORM

```js
console.log("OS Platform:", os.platform());
// Kaunsa operating system hai
// win32  → Windows
// linux → Linux (production servers)
// darwin → macOS
```

**Real Life Use:**

- Cross-platform apps
- Windows vs Linux server behavior

---

## 2️⃣ USER INFO

```js
console.log("User Info:", os.userInfo());
// Current logged-in user ki details
// username, homedir, shell, etc.
```

**Use Cases:**

- User-specific configs
- Permission handling

---

## 3️⃣ CPU ARCHITECTURE

```js
console.log("CPU Architecture:", os.arch());
// CPU 32-bit ya 64-bit
// x64 = 64-bit processor
```

---

## 4️⃣ CPU CORE DETAILS

```js
console.log("CPU Core Info:", os.cpus());
// Har CPU core ka detail
// model, speed, time usage
```

---

## 5️⃣ TOTAL CPU CORES

```js
console.log("CPU Cores Count:", os.cpus().length);
// Total number of CPU cores
// Cluster / Worker threads decide karne me use
```

---

## 6️⃣ FREE MEMORY

```js
console.log("Free Memory:", os.freemem(), "bytes");
// Abhi kitni RAM free hai
```

---

## 7️⃣ TOTAL MEMORY

```js
console.log("Total Memory:", os.totalmem(), "bytes");
// System ki total RAM
```

---

## 8️⃣ HOME DIRECTORY

```js
console.log("Home Directory:", os.homedir());
// User ka home folder path
```

---

## 9️⃣ HOST NAME

```js
console.log("Host Name:", os.hostname());
// Network me system ka naam
```

---

## 🔟 NETWORK INTERFACES

```js
console.log("Network Interfaces:", os.networkInterfaces());
// WiFi / Ethernet
// IPv4 / IPv6 details
```

---

## 1️⃣1️⃣ OS RELEASE

```js
console.log("OS Release:", os.release());
// OS ka build / release number
```

---

## 1️⃣2️⃣ TEMP DIRECTORY

```js
console.log("Temp Directory:", os.tmpdir());
// Temporary files ka path
```

---

## 1️⃣3️⃣ SYSTEM UPTIME

```js
console.log("OS Uptime:", os.uptime(), "seconds");
// System kitni der se ON hai
```

---

## 1️⃣4️⃣ OS VERSION

```js
console.log("OS Version:", os.version());
// Human readable OS version
```

---

## 1️⃣5️⃣ LOAD AVERAGE

```js
console.log("Load Average:", os.loadavg());
// CPU load (Linux/Mac)
```

---

## 1️⃣6️⃣ ENDIANNESS, CONSTANTS, TYPE

```js
console.log("OS Endianness:", os.endianness());
// CPU byte order (mostly LE)

console.log("OS Constants:", os.constants);
// OS signals & error codes

console.log("OS Type:", os.type());
// Windows_NT / Linux / Darwin
```

---

# 🔐 PART 2: CRYPTO MODULE

## *(Security – First Principles Approach)*

---

## 🧠 FIRST THOUGHT: SECURITY KI ROOT PROBLEM

Internet pe **trust default nahi hota**.
Server assume nahi kar sakta ki:

- user honest hai
- network safe hai
- data koi read nahi karega

Isliye problems aati hain:

- Password leak ho sakta hai
- Messages koi bhi padh sakta hai
- Tokens guess ho sakte hain

👉 **Crypto module = trust ka foundation**

Ye decide karta hai:
- kaun authenticate ho sakta hai
- kaunsa data readable hai
- kaunsa data sirf lock me rahega**

---

## 📦 CRYPTO MODULE IMPORT

```js
const crypto = require("crypto");
// Node.js ka built-in security module
```

---

## 1️⃣ RANDOM BYTES (TOKENS / SECRETS)

```js
const randomValues = crypto.randomBytes(100);
console.log(randomValues);               // Buffer (binary)
console.log(randomValues.toString("hex")); // Readable secure string
```

**Real Life Use:**

- OTP
- Password reset links
- JWT / API secrets

---

## 🧠 BUFFER THEORY

- Node.js programs RAM me run hote hain
- Buffer = raw binary data
- Crypto + Streams + Networking ka base

---

## 2️⃣ HASHING (PASSWORD SECURITY)

### 🧠 FIRST PRINCIPLE

Password **kabhi decryptable nahi hona chahiye**

👉 **Passwords are hashed, not encrypted**
avoids massive security breaches.

---

### 🔐 PASSWORD HASH CODE

```js
const hashValue = crypto
  .createHash("sha256")
  .update("Harshal")
  .digest("hex");
```

---

### 🔄 LOGIN MATCH LOGIC

```js
const inputValue = "Harshal";

const matchValue = crypto
  .createHash("sha256")
  .update(inputValue)
  .digest("hex");

if (hashValue === matchValue) {
  console.log("You can login ✅");
} else {
  console.log("Invalid credentials ❌");
}
```

---

# 🔐 PART 3: ENCRYPTION & DECRYPTION

## *(Complete Theory + Fully Commented Code)*

---

## 🧠 FIRST PRINCIPLE

Security ka sabse important decision ye hota hai:

> **Kya is data ko future me wapas padhna hai?**

- Password → Hash (never needed again)
- Message / Card data → Encrypt (needed later)

Galat choice = security disaster.
Isliye hashing aur encryption ko kabhi mix nahi karte.

---

## 🔑 ENCRYPTION THEORY

Encryption plain data ko **locked form** me convert karta hai.

```
Plain Text → Encrypt → Cipher Text
```

### 🧠 Conceptually kya hota hai?
- Original data destroy nahi hota
- Data sirf lock ho jata hai
- Lock kholne ke liye key chahiye

### Important Points
- Data unreadable hota hai
- Secret key ke bina useless
- Authorized system hi decrypt kar sakta hai

---

## 🔓 DECRYPTION THEORY

Decryption encryption ka **reverse process** hai.

```
Cipher Text → Decrypt → Plain Text
```

### 🧠 Key Rules
- Same algorithm required
- Same secret key required
- Same IV required

❌ Galat key / IV → data wapas nahi milega
Isliye keys ko hamesha securely store karte hain.

---

## 🔐 AES-256-CBC ENCRYPTION & DECRYPTION CODE

```js
const crypto = require("crypto");

// STEP 1: Algorithm
the algorithm defines how encryption works
const algorithm = "aes-256-cbc";

// STEP 2: Secret Key (actual lock key)
const secretKey = crypto.randomBytes(32);

// STEP 3: Initialization Vector (extra randomness)
const iv = crypto.randomBytes(16);

// STEP 4: Plain text data
const message = "Hello Harshal";

// ENCRYPTION PROCESS
const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
let encrypted = cipher.update(message, "utf8", "hex");
encrypted += cipher.final("hex");
console.log("Encrypted:", encrypted);

// DECRYPTION PROCESS
const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");
console.log("Decrypted:", decrypted);
```

---

## 🆚 HASHING vs ENCRYPTION

| Feature   | Hashing | Encryption |
| --------- | ------- | ---------- |
| Direction | One-way | Two-way    |
| Passwords | ✅       | ❌          |
| Messages  | ❌       | ✅          |

---

# 🎯 FINAL FIRST-PRINCIPLE SUMMARY

- OS Module → Server ka **body**
- Crypto Module → Server ka **trust system**
- Hashing → Identity proof
- Encryption → Confidentiality

---

## 🔥 INTERVIEW GOLD LINE

> "Hashing verifies identity, encryption protects confidentiality."

