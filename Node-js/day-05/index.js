const crypto = require("crypto")
// 👉 Node.js ka built-in crypto module import kiya
// 👉 Ye module security related kaam ke liye use hota hai
// 👉 Jaise: random values, hashing, encryption, decryption, tokens, etc.

// =====================================================
// 1. randomBytes
// =====================================================

const randomvalues = crypto.randomBytes(100);  
// 👉 100 bytes ki cryptographically strong random value generate karta hai
// 👉 Ye random value mostly use hoti hai:
//    - tokens generate karne me
//    - session IDs
//    - password reset links
//    - secret keys

console.log(randomvalues);  
// 👉 Output Buffer form me aata hai
// 👉 Buffer = raw binary data jo RAM me hota hai
// 👉 Ye directly readable nahi hota humans ke liye

// buffer --> ASCII / readable form me convert karna padta hai
// isliye toString() use karte hain

console.log(randomvalues.toString("hex"))  
// 👉 Hex format me convert kar diya (readable + compact)
// 👉 Mostly production me hex ya base64 format use hota hai
// 👉 Secure random string generate karne ke liye best method


// =====================================================
// 2. createHash (PASSWORD HASHING)
// =====================================================

// 👉 Real-life scenario:
// Jab aap kisi platform pe login karte ho:
// - Username → plain text me store hota hai
// - Password → kabhi bhi plain text me store nahi hota ❌
// - Password ko HASH me convert karke database me store kiya jata hai

// 👉 Platform password ko directly compare nahi karta
// 👉 Wo input password ka hash banata hai
// 👉 Phir DB me stored hash se compare karta hai

const hashvalue = crypto
  .createHash("sha256")   // 👉 SHA-256 hashing algorithm
  .update("Harshal")      // 👉 Original value
  .digest("hex");         // 👉 Final hash output (hex format)

const inputValue = "Harshal"

const matchValue = crypto
  .createHash("sha256")
  .update(inputValue)
  .digest("hex");

// 👉 Dono hashes compare honge (plain password kabhi compare nahi hota)

if (hashvalue === matchValue) {
  console.log("you can login")
} else {
  console.log("Something went wrong")
}

// =====================================================
// 🔐 HASHING vs ENCRYPTION vs DECRYPTION (THEORY PART)
// =====================================================

/*
========================
1️⃣ HASHING
========================
👉 One-way process hota hai
👉 Original data wapas nahi nikala ja sakta ❌
👉 Same input → same output (always)

Use cases:
✔ Password storage
✔ Data integrity check
✔ Digital signatures

Example:
Password → Hash → Compare
(No decryption possible)

========================
2️⃣ ENCRYPTION
========================
👉 Two-way process hota hai
👉 Plain text → Encrypted text (cipher text)
👉 Secret key use hoti hai

Use cases:
✔ Sensitive data storage
✔ Secure communication
✔ Payment information

Example:
Message → Encrypt (key) → Cipher text

========================
3️⃣ DECRYPTION
========================
👉 Encryption ka reverse process
👉 Cipher text → Original plain text
👉 Same secret key (or private key) required

Example:
Cipher text → Decrypt (key) → Original message

========================
🔥 SIMPLE DIFFERENCE
========================
HASHING     → Lock karke chabi hi fenk di 🔒
ENCRYPTION → Lock + chabi dono tumhare paas 🔐

========================
INTERVIEW LINE (IMP)
========================
❝ Passwords are hashed, not encrypted ❞
*/

// =====================================================
// REAL-LIFE SUMMARY
// =====================================================
/*
👉 Login systems → HASHING
👉 Secure messages → ENCRYPTION + DECRYPTION
👉 Tokens / IDs → randomBytes
*/
