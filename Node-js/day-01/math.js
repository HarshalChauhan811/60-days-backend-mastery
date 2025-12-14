function Add(a, b) {
    return a + b;
}

function Sub(a, b) {
    return a - b;
}

// module.exports = Add;
// module.exports = Sub;  
// ⚠️ Problem: Jab aise export karte ho, 
// last wali line pehli wali ko override kar deti hai.
// Isliye sirf ek hi function bahar ja pata hai.

// ❓ Solution?
// Agar ek hi file se 5–10 functions export karne ho,
// to hume ek OBJECT ke andar sab functions ko bundle karke
// export karna hota hai.

// Yeh Node.js ka standard tariqa hai multiple functions export karne ka:

module.exports = {
    // Add: Add,  
    // Aise direct name likh sakte the, par neeche rename karke export kiya hai.

    AddFunc: Add, 
    // ✔️ Yaha hum Add function ko AddFunc naam se export kar rahe hain.
    // Rename karna useful hota hai jab project bda ho jaye.

    SubFunc: Sub
    // ✔️ Same as above — readable aur organized export.
};

// Ab koi bhi file me: 
// const { AddFunc, SubFunc } = require("./math");
// Aur dono functions ko easily use kar sakte ho. 😎
