# 🌟 Node.js Week — Day 1 (Master Notes)
### *First Principles + Figures + Real Life Examples + Code Included*

---

# 🟩 1. What is Node.js? (Concept + Figure)
JavaScript originally **sirf browser ke andar** run hota tha, browser ke JS Engine ki wajah se.

```
Browser
 ├── HTML
 ├── CSS
 └── JavaScript  ← runs ONLY inside browser (default)
```

### ❗ Problem (Before Node)
- JS cannot access files
- JS cannot access OS
- JS cannot create servers
- JS only runs inside browsers

---

# 🟦 2. JavaScript Engines (Why JS behaves differently?)
Different browsers use different JS engines:
- Chrome → **V8 Engine**
- Firefox → **SpiderMonkey**
- Safari → **JavaScriptCore**
- Edge → Chakra (old)

### ⚡ First Principle
> “JS ka real kaam *engine* karta hai. Browser sirf environment deta hai.”

Isliye har browser me JS behaviour thoda vary karta hai.

---

# 🟪 3. How Node.js Was Born? (Figure)
```
 V8 Engine   +   C++ Bindings
     \         /
      \       /
        Node.js Runtime
```
Ryan Dahl ne V8 engine ko C++ ke through **OS + Machine Resources** se connect kiya.

### Node.js gives JS superpowers:
✔ JS browser ke bahar run hota hai  
✔ JS can access files, OS, network  
✔ JS can create **servers**  
✔ Non-blocking architecture → **fast**

---

# 🟧 4. Why Node.js?
1. JS can run outside browser  
2. Direct OS access (FS, Network, Process)  
3. Backend + APIs build kar sakte ho  
4. Super fast because of event-driven architecture

---

# 🟨 5. Node.js Architecture (Event Loop + Thread Pool)

```
           ┌──────────────┐
Request →  │  Event Queue │
           └──────┬───────┘
                  │
            ┌─────▼─────┐
            │ Event Loop │  ← waiter (takes orders fast)
            └─────┬─────┘
     ┌────────────┴────────────┐
     │                          │
Simple Tasks              Heavy Tasks
(console.log)        (File Read, Crypto, FS)
                          │
                          ▼
                   ┌────────────┐
                   │Thread Pool │  ← chefs (do heavy work)
                   └────────────┘
                          │
                          ▼
                     Response Back
```

### Real Life Analogy 🍽️
- **Event Loop = Waiter** → Tezi se orders leta hai
- **Thread Pool = Chefs** → Heavy kaam karte hain
- **Event Queue = Customers** → Saare requests orderly process hote

---

# 🟫 6. Node.js vs Browser JS
| Feature | Browser | Node.js |
|--------|---------|----------|
| window | ✔ | ❌ |
| document | ✔ | ❌ |
| fetch | ✔ | ⚠️ (v20+) |
| fs module | ❌ | ✔ |
| os module | ❌ | ✔ |

---

# 🟩 7. Node.js Practical FS + OS Code
### Importing Modules
```javascript
const fs = require("fs");
const os = require("os");
```

### Check CPU Cores
```javascript
console.log(os.cpus().length);
```

---

# 🟦 8. WRITE File
### Sync Write
```javascript
fs.writeFileSync("./text.txt", "Hey this is sync writing in the file");
```

### Async Write
```javascript
fs.writeFile("./harshal.txt", "hello world i am async code", (err)=>{
    console.log(err);
});
```

---

# 🟧 9. READ File
### Sync Read
```javascript
const res = fs.readFileSync("./harshal.txt", "utf8");
console.log(res);
```

### Async Read
```javascript
fs.readFile("./harshal.txt", "utf-8", (error, response)=>{
    if(error) console.log(error);
    else console.log(response);
});
```

---

# 🟨 10. UPDATE / APPEND File
### Sync Append
```javascript
fs.appendFileSync("./text.txt", new Date().toDateString());
```

### Async Append
```javascript
fs.appendFile(
    "./new.txt",
    `Hello world this is harshal logged in at ${new Date().toDateString()}\n`,
    (err, res)=>{
        if(err) console.log(err);
        else console.log(res);
});
```

---

# 🟥 11. Important FS Methods
### Copy File
```javascript
fs.cpSync("./text.txt", "./copy.txt");
```

### Delete File
```javascript
fs.unlinkSync("./copy.txt");
```

### File Info
```javascript
const info = fs.statSync("./text.txt");
console.log(info.size);
console.log(info.isFile());
```

### Create Folder
```javascript
fs.mkdirSync("./harshalFolder");
```

---

# 🟦 12. Exporting Multiple Functions
```javascript
function Add(a, b){ return a+b; }
function Sub(a, b){ return a-b; }

module.exports = {
    AddFunc: Add,
    SubFunc: Sub
};
```

### Import
```javascript
const { AddFunc, SubFunc } = require("./math");
console.log(AddFunc(12,34), SubFunc(5,2));
```

---

# 🌟 FINAL SUMMARY
- JS originally browser-only  
- Engines → V8, SpiderMonkey, JSC  
- Node.js = V8 + C++  
- Runs JS outside browser  
- Event Loop + Thread Pool architecture  
- FS = read, write, append, delete  
- Sync = blocking, Async = non-blocking  
- Module exports via object

---

#  Made By @Harshal Chauhan


