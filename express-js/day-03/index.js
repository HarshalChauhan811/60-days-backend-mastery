import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

/**
 * CONCEPT: Stateless Server & Cookies
 * ---------------------------------
 * 1. HTTP Server 'Stateless' hota hai (matlab thoda bhulakkad hota hai).
 *    Jab client (Browser/Postman) request bhejta hai, server response deta hai aur client ko bhool jata hai.
 *    Agli request kisne bheji, server ko nahi pata hota.
 * 
 * 2. Pehchan (Identity) yaad rakhne ke liye hum 'Cookies' use karte hai.
 *    Cookie ek choti si text file (max size 4KB) hoti hai jo server client ke browser me save karwa deta hai.
 *    Har agli request ke sath browser khud-ba-khud ye cookie server ko wapas bhejta hai headers me.
 */

// Middleware setup
// 'secret' string ka use cookies ko SIGN karne ke liye hota hai (Digital Signature).
// Agar client (browser) cookie ki value change karne ki koshish karega, 
// to signature match nahi karega aur server usse reject kar dega (req.signedCookies me false/undefined aayega).
app.use(cookieParser("secret_key_123")); 

app.get('/', (req, res) => {
    // !. How to set a Cookie
    // Server client ko bol raha hai: "Ye data apne paas store kar lo."
    res.cookie("userId", "99", { 
        // 'maxAge': Cookie ki validity milliseconds me. (Yaha 24 ghante set hai)
        maxAge: 1000 * 60 * 60 * 24, 
        
        // 'httpOnly': True karne par client-side JavaScript (document.cookie) se 
        // is cookie ko access nahi kiya ja sakta (Security badh jati hai XSS attack se bachne ke liye).
        httpOnly: true, 

        // 'signed': True karne par express is value ko encrypt/sign kar dega "secret" key use karke.
        // Isse ye ensure hota hai ki user ne value tamper (change) nahi ki hai.
        signed: true 
    });

    res.send('Hello World - Cookie set kar di gayi hai!');
});

app.get("/product", (req, res) => {
    // !. Reading Cookies
    // 'req.headers.cookie' me cookie plain string hoti hai (e.g., "userId=99; name=express").
    // 'cookie-parser' us string ko todkar (parse karke) Sundar Object bana deta hai.
    
    // Normal (Unsigned) cookies yaha milengi:
    console.log("Normal Cookies:", req.cookies); 
    
    // Signed (Tamper-proof) cookies yaha milengi (Decoded value):
    // Agar user ne browser me value change ki hoti, to ye cookie yaha show nahi hoti (false ho jati).
    console.log("Signed Cookies:", req.signedCookies);

    // !. Authorization Logic
    // Check kar rahe hai ki kya user ke paas sahi cookie hai?
    // Note: Upar humne 'userId' set kiya tha signed, par yaha code logic me 'name' check ho raha hai.
    // Real world me hum 'userId' check karte.
    
    // Logic: Agar 'name' naam ki cookie exist karti hai AUR uski value 'express' hai tabhi data dikhao.
    if (req.cookies.name && req.cookies.name === "express") {
        return res.status(200).send({
            id: 1,
            name: "Item-01",
            price: "$100"
        });
    }

    // Agar cookie nahi mili ya value galat hai:
    res.status(403).send("You are not authorized to view this page (Cookie missing or invalid)");
});

app.listen(8080, () => {
    console.log('Server is running on port http://localhost:8080');
});


/**
 * !. DIFFERENCE BETWEEN && AND ??
 * -------------------------------
 * 
 * 1. && (Logical AND):
 *    - Ye check karta hai ki kya pehli value "Truthy" hai?
 *    - Agar pehli value false, 0, "", null, undefined hoti hai, to ye wahi ruk jata hai.
 *    Example:
 *    let val = 0 && 50;  // Output: 0 (Kyunki 0 falsy hai)
 *    let val = 10 && 50; // Output: 50 (Kyunki 10 truthy hai, to right side wala return hoga)
 * 
 * 2. ?? (Nullish Coalescing Operator):
 *    - Ye thoda strict hai. Ye sirf tabhi right side wali value deta hai 
 *      jab left side wali value specifically 'null' ya 'undefined' ho.
 *    - Agar value 0 ya "" (empty string) hai, to ye usse valid data maanta hai.
 *    Example:
 *    let val = 0 ?? 50;         // Output: 0 (Kyunki 0 null nahi hai, valid number hai)
 *    let val = null ?? 50;      // Output: 50
 *    let val = undefined ?? 50; // Output: 50
 */