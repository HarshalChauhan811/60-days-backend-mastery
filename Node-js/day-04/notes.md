[+] Introduction✅
[+] Streams are NOT ONLY for streaming videos/audios.✅
[+] Understanding streams and buffers✅
[+] Create http server✅
[+] Downloading big files from server (a good way and a bad way)✅
[+] Copy files on file systems (a good way and a bad way)✅
[+] Create custom streams (Readable✅ / Writable✅ / Transform)
[+] String processing (a good way and a bad way)
[+] Pipes




# 📘 Day–4: Streams One Shot (Node.js)

**Made By @Harshal Chauhan**

---

## 👶 Beginner Friendly Start – Pehle Ye Samjho

### 🤔 Node.js me dikkat kaha aati hai?

Socho tumhare paas **bahut badi file** hai (100MB, 1GB).

Agar tum ye karo:
- poori file ek saath RAM me lao
- phir process karo

👉 RAM bhar jaayegi ❌
👉 Server slow ho jaayega ❌

**Is problem ka smart solution = STREAMS** ✅

> Streams ka matlab hai: data ko **thoda-thoda karke** use karna

---

## 🧠 First Thought Principle – Streams Kyun?

### ❓ Core Problem

Large data (files, network response, videos) ko handle karna bina:

- poora data RAM me load kiye ❌
- server slow/crash kiye ❌

### ❌ Traditional Approach (Non‑Streaming)

- Pehle **poora data memory me load** hota hai
- Phir process / copy hota hai
- Large file = large memory usage

👉 Ye approach scalable nahi hai

---

## ✅ First Principle Solution – Streaming

> **Data ko ek saath load mat karo, chhote‑chhote chunks me process karo**

Isi idea ko kehte hain **STREAMS**

---

## 🍽️ Figure 1: Restaurant Analogy (Intuition Builder)

### Situation:

Socho tum restaurant gaye aur **5 items order kiye**

### ❌ Non‑Streaming Behaviour

- Jab tak **saare items ready na ho jaye**, tab tak serve nahi karte
- Tum wait karte rehte ho

➡️ Ye = `fs.readFileSync()` type behaviour

### ✅ Streaming Behaviour

- Starter ready → turant serve
- Main course ready → serve
- Dessert ready → serve

➡️ Ye = **Streams**

📌 **Key Learning:**

> Jo ready hai, wahi turant process/serve karo

---

## 🌊 Streams Kya Hote Hain?

> Stream = **Flow of data over time (chunks me)**

Examples:

- Water pipe
- Netflix video
- YouTube live stream

---

## 🧱 Types of Streams (Foundation)

### 1️⃣ Readable Stream

➡️ Data produce karta hai

Examples:

- `fs.createReadStream()`
- `req` (HTTP request)

---

### 2️⃣ Writable Stream

➡️ Data consume karta hai

Examples:

- `fs.createWriteStream()`
- `res` (HTTP response)

---

### 3️⃣ Transform Stream

➡️ Data ko **read + modify + write** karta hai

Examples:

- Text uppercase
- Compression
- Encryption

---

## 🔗 Pipe – Streams ko Connect Karna

> Readable stream ka output → Writable stream ka input

Benefits:

- Automatic flow control
- Memory efficient
- Clean code

---

## 🔐 Pipeline – Production Grade Pipe

### Pipe ka problem:

- Error handling weak

### Pipeline ka fayda:

- Error automatically catch
- Stream failure app crash nahi karti

👉 **Industry recommended**

---

## 🧠 Figure 2: Streaming vs Non‑Streaming (Concept Diagram)

### ❌ Without Streaming

```
Data → Load into Memory → Copy → Output
```

- High RAM usage

### ✅ With Streaming

```
Data → Readable Stream → Buffer → Writable Stream → Output
```

- Controlled memory
- Chunk‑by‑chunk flow

---

## 🧠 Buffer & highWaterMark (Very Important)

### Buffer Kya Hai?

- Temporary storage jaha chunks rukte hain

### highWaterMark

- Buffer ka max size define karta hai

📌 Example:

```
highWaterMark: 6
```

- Matlab ek baar me 6 bytes

---

## 🚦 Backpressure (Interview Favourite)

> Jab writable stream slow ho jaye → readable ko bola jata hai **ruk ja**

➡️ Ye automatic hota hai streams me

---

## 🛠️ Custom Streams – Deep Node.js Concept

### Kyun Custom Stream?

- Jab built‑in streams kaafi na ho
- Jab full control chahiye

Control milta hai:

- Data flow
- Buffer size
- Push timing

---

## 🧱 Custom Readable Stream – Core Idea

- `push()` → manually data bhejna
- `read()` → internal logic

### Flow:

```
push(data)
   ↓
Readable Stream
   ↓
"data" event
   ↓
Writable Stream
```

---

## 🧠 Code ko Theory se Connect Kaise Kare?

### `push("Hello")`

➡️ Data ko readable stream me manually daalna

### `data` event

➡️ Jab chunk available ho

### `write()`

➡️ Data consume karna

### `true / false` return

➡️ Buffer full hua ya nahi

---

## 🏭 Real‑Life Factory Analogy

- Readable → Machine
- Writable → Packing unit
- Buffer → Storage area
- highWaterMark → Storage limit
- Backpressure → "Stop production"

---

## 💻 Code Examples (Theory → Code Mapping)

### 🔹 Example 1: File Streaming (Readable → Writable)

🧠 **Beginner Soch:**
"Mujhe file ko read bhi karna hai aur copy bhi karni hai — bina RAM bhare"

```js
// 📦 File system module import
const fs = require("fs");

// 📖 Readable Stream
// sample.txt ko thoda-thoda (chunks) me read karega
const readStream = fs.createReadStream("sample.txt");

// ✍️ Writable Stream
// jo data aayega usko output.txt me likhega
const writeStream = fs.createWriteStream("output.txt");

// 🔗 Pipe = direct connection
// Read → Write (automatic, efficient)
readStream.pipe(writeStream);
```

📌 **Beginner Key Points:**
- `createReadStream` = data laata hai
- `createWriteStream` = data likhta hai
- `pipe()` = dono ko jod deta hai

---
```js
const fs = require("fs");

// Readable stream: file ko chunks me read karega
const readStream = fs.createReadStream("sample.txt");

// Writable stream: chunks ko output file me write karega
const writeStream = fs.createWriteStream("output.txt");

// Pipe readable → writable (memory efficient)
readStream.pipe(writeStream);
```

📌 **Samajhne wali baat:**
- Puri file RAM me load nahi hoti
- Data chunk‑by‑chunk flow karta hai

---

### 🔹 Example 2: Transform Stream (Data Modify karna)

🧠 **Beginner Soch:**
"File read bhi karni hai **aur** data change bhi karna hai"

```js
const fs = require("fs");
const { Transform, pipeline } = require("stream");

// 📖 Read file as stream
const readStream = fs.createReadStream("sample.txt");

// ✍️ Write modified data
const writeStream = fs.createWriteStream("output.txt");

// 🔄 Transform Stream
// Ye data ko read bhi karta hai aur modify bhi
const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    // 🧩 Buffer → String
    const text = chunk.toString();

    // ✨ Data modification
    const modified = text
      .toUpperCase()
      .replaceAll(/ipsum/gi, "Harshal");

    // ➡️ Next stream ko bhej do
    callback(null, modified);
  }
});

// 🚀 Safe pipeline (production ready)
pipeline(readStream, transformStream, writeStream, (err) => {
  if (err) console.error(err);
});
```

📌 **Beginner Mapping:**
- `chunk` = data ka chhota hissa
- `Transform` = beech ka worker
- `pipeline` = safe connection

---
```js
const { Transform, pipeline } = require("stream");
const fs = require("fs");

const readStream = fs.createReadStream("sample.txt");
const writeStream = fs.createWriteStream("output.txt");

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const modified = chunk
      .toString()
      .toUpperCase()
      .replaceAll(/ipsum/gi, "Harshal");

    callback(null, modified);
  }
});

pipeline(readStream, transformStream, writeStream, (err) => {
  if (err) console.error(err);
});
```

📌 **Mapping:**
- `chunk` → file ka chhota hissa
- `Transform` → readable + writable dono
- `pipeline` → safe production‑ready flow

---

### 🔹 Example 3: Custom Readable & Writable Stream

🧠 **Beginner Soch:**
"Agar mujhe apna khud ka data stream banana ho to?"

```js
const { Readable, Writable } = require("stream");

// 📖 Custom Readable Stream
const readableStream = new Readable({
  highWaterMark: 6, // 🧠 buffer size = 6 bytes
  read() {},        // required method
});

// ✍️ Custom Writable Stream
const writableStream = new Writable({
  write(data) {
    console.log("📝 Writing:", data.toString());
  }
});

// 🔄 Jab bhi data aaye
readableStream.on("data", (chunk) => {
  console.log("📦 CHUNK:", chunk.toString());
  writableStream.write(chunk);
});

// 🚀 Manually data bhejna
console.log(readableStream.push("Hello"));
```

📌 **Beginner Understanding:**
- `push()` = data bhejna
- `highWaterMark` = limit
- `true/false` = buffer full ya nahi

---
```js
const { Readable, Writable } = require("stream");

const readableStream = new Readable({
  highWaterMark: 6, // buffer size = 6 bytes
  read() {},
});

const writableStream = new Writable({
  write(data) {
    console.log("Writing...", data.toString());
  }
});

readableStream.on("data", (chunk) => {
  console.log("CHUNK:", chunk.toString());
  writableStream.write(chunk);
});

console.log(readableStream.push("Hello"));
```

📌 **Mapping:**
- `highWaterMark` → buffer capacity
- `push()` → manually data bhejna
- `true / false` → backpressure signal

---

## 🎯 Interview Ready One‑Liners

- Streams are memory efficient
- Node.js is stream‑based
- Transform = readable + writable
- pipeline > pipe
- Backpressure prevents overload

---

## 🧠 Final Mindset Shift

❌ Node.js sirf fast nahi hai

✅ Node.js **data flow ko smartly handle karta hai using streams**

Agar streams samajh gaye →

- Backend scalable
- File handling efficient
- Performance optimized

🚀

