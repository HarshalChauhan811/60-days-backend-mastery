
# 🚀 Ultimate Guide: Cookies, Headers & Status Codes in Express (ES Modules)

## 🏗️ Chapter 1: The Foundation (Project Setup)

Coding start karne se pehle, hamein **Environment** banana padega.

### Step 1: Initialize Project (Neev rakhna)
Sabse pehle ek folder banao aur terminal me likho:
```bash
npm init -y
```
> **Kya hua?** Ek `package.json` file bani. Ye aapke project ka **Identity Card** hai (Project ka naam, version, dependencies sab yahi likha hota hai).

### Step 2: Install Tools (Auzaar lana)
Hamein server banane ke liye `express` aur cookies padhne ke liye `cookie-parser` chahiye.
```bash
npm install express cookie-parser
```

### Step 3: Enable ES Modules (Modern JavaScript)
Node.js default roop se purana `require()` syntax use karta hai. Naya `import` syntax use karne ke liye `package.json` kholo aur ye line add karo:
```json
"type": "module"
```
> **Kyun?** Taaki hum `import express from 'express'` likh sakein, jo ki modern standard hai.

---

## 🍪 Chapter 2: Cookies (The Memory)

### 🧠 First Principle: Cookies ki zarurat kyun padi?
**Problem:** HTTP Server (Express) **Stateless** hota hai.
**Meaning:** Server "Ghajini" movie ke Aamir Khan jaisa hai. Aapne request bheji, usne jawab diya, aur wo bhool gaya. Agli request me wo aapse phir puchega—"Kaun ho tum?"

**Solution:** **Cookies**.
Server pehli mulakaat me client (Browser) ko ek **Parchi (Note)** deta hai aur kehta hai—*"Jab agli baar aana, ye parchi dikhana, main samajh jaunga tum wahi purane wale ho."*

### 💻 The Code (index.mjs)

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

// 🟢 MIDDLEWARE: Cookie Parser
// Express by default body padh leta hai, par cookies nahi.
// Ye middleware request aate hi 'headers' me se cookie nikal kar
// ek sundar object (req.cookies) bana deta hai.
app.use(cookieParser()); 

// 🟢 1. Setting a Cookie (Server Client ko parchi de raha hai)
app.get('/set-cookie', (req, res) => {
    // Syntax: res.cookie(name, value, [options])
    res.cookie('userType', 'premium_member', {
        maxAge: 1000 * 60 * 60 * 24, // 1 Din (Milliseconds me)
        httpOnly: true, // 🔒 Security: Frontend JS isse access nahi kar sakti
        secure: false,  // HTTPS ho to true, Localhost pe false
    });
    res.send('Cookie set kar di gayi hai!');
});

// 🟢 2. Reading Cookies (Server parchi check kar raha hai)
app.get('/get-cookie', (req, res) => {
    // req.cookies access karne ke liye 'cookie-parser' zaruri hai
    console.log(req.cookies); 
    res.send(`Server ko ye cookies mili: ${JSON.stringify(req.cookies)}`);
});

// 🟢 3. Deleting Cookies (Parchi faad dena)
app.get('/delete-cookie', (req, res) => {
    // Browser ko bolna ki ye cookie bhool jao
    res.clearCookie('userType');
    res.send('Cookie delete ho gayi!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

### 🔍 Deep Dive: Cookie Options (Interview Questions)
Jab hum cookie set karte hain, to options ka kya matlab hai?

1.  **`maxAge`**: **Expiry Date**.
    *   *Real Life:* Doodh ke packet ki expiry date. Uske baad wo kharab (invalid).
2.  **`httpOnly: true`**: **XSS Protection**.
    *   *Matlab:* Sirf Server isse padh payega. Browser ki JavaScript (`document.cookie`) isse nahi padh sakti.
    *   *Real Life:* Museum me rakha Heera (Diamond). Aap dekh sakte ho (use kar sakte ho request me), par chhu nahi sakte (edit/read via JS nahi kar sakte).
3.  **`secure: true`**: **HTTPS Only**.
    *   *Matlab:* Cookie tabhi bheji jayegi jab connection secure (encrypted) ho.

---

## ✉️ Chapter 3: HTTP Headers (The Envelope)

### 🧠 First Principle: Headers kya hain?
Data bhejne ke liye sirf data kaafi nahi hota, **Context** bhi chahiye.
**Analogy:** Jab aap Amazon se parcel mangate ho:
*   **Box ke andar:** Aapka item (Body).
*   **Box ke upar sticker:** Address, Weight, Sender ka naam (Headers).

**Headers = Metadata (Data about Data)**

### 1. Request Headers (Client -> Server)
Jab Browser Server se baat karta hai.
*   `User-Agent`: "Main Chrome browser hu, mobile se chala raha hu."
*   `Accept`: "Mujhe jawab me JSON file dena, HTML mat dena."
*   `Authorization`: "Ye lo mera Token (Entry Pass)."

### 2. Response Headers (Server -> Client)
Jab Server wapas jawab deta hai.
*   `Content-Type`: "Ye jo data bhej raha hu, wo 'image/png' hai."
*   `Content-Length`: "File ka size 5MB hai."
*   `Set-Cookie`: "Ye cookie save kar lo."

---

## 🚦 Chapter 4: HTTP Status Codes (The Feedback)

### 🧠 First Principle: Communication Clarity
Jab aap server se kuch maangte ho, to server ko batana padta hai ki **kya hua?**
*   Kya kaam ho gaya?
*   Kya tumne kuch galat maanga?
*   Kya server kharab ho gaya?

Isi "Result" ko numbers ke through bataya jata hai.

### 📊 The 5 Families of Status Codes

#### 1xx: Informational (Hold par raho)
*   **Example:** `100 Continue`.
*   *Meaning:* "Request mil gayi hai, process kar raha hu, connection mat kaatna."

#### 2xx: Success (Kaam ho gaya) ✅
*   **`200 OK`**: Sab badhiya hai. (Standard success).
*   **`201 Created`**: Nayi cheez ban gayi. (Jaise: Register karne ke baad).
*   **`204 No Content`**: Kaam ho gaya, par wapas dikhane ko kuch nahi hai. (Jaise: Delete operation).

#### 3xx: Redirection (Wahan jao) ↩️
*   **`301 Moved Permanently`**: "Dukaan shift ho gayi hai, naye address par jao." (SEO ke liye important).
*   **`302 Found (Temporary)`**: "Aaj ke liye wahan chale jao."
*   **`304 Not Modified`**: "Tumhare paas jo data cache me pada hai, wahi use kar lo. Maine kuch change nahi kiya." (Data bachaane ke liye).

#### 4xx: Client Errors (Tumhari galti) 🫵
*   **`400 Bad Request`**: "Tumne form galat bhara hai." (Syntax error).
*   **`401 Unauthorized`**: "Tum kaun ho? Login karke aao." (**Authentication** missing).
*   **`403 Forbidden`**: "Main tumhe janta hu, par tumhe yahan aane ki permission nahi hai." (Admin page access by normal user -> **Authorization** fail).
*   **`404 Not Found`**: "Jo URL tum dhoond rahe ho, wo exist nahi karta."

#### 5xx: Server Errors (Meri galti) 💥
*   **`500 Internal Server Error`**: "Mere code me bug hai, ya database connect nahi ho raha."
*   **`502 Bad Gateway`**: "Main (Server) sahi hu, par jahan se data lana tha usne dhokha de diya."
*   **`503 Service Unavailable`**: "Server overload ho gaya hai, thodi der baad aana."

---

### 📝 Quick Cheat Sheet (Yaad rakhne ke liye)

| Code | Hinglish Matlab | Real Life Example |
| :--- | :--- | :--- |
| **200** | Sab Sahi Hai | Pizza Deliver ho gaya. |
| **201** | Ban Gaya | Naya ghar ban gaya. |
| **400** | Tu pagal hai kya? | Aapne Pizza order kiya par address nahi likha. |
| **401** | Tu kaun hai? | Building ke guard ne ID card maanga. |
| **403** | Tu allowed nahi hai | ID card hai, par Boss ke cabin me jana allowed nahi. |
| **404** | Nahi mila | Aap galat ghar ki ghanti baja rahe ho. |
| **500** | Main phat gaya | Kitchen me aag lag gayi (Server crash). |