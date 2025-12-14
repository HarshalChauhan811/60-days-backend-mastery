// fs module import kiya gaya hai
// Ye Node.js ka core module hai jo file read/write ke kaam aata hai
const fs = require("fs")

// Simple synchronous console log
// Ye sabse pehle execute hota hai kyunki blocking code hai
console.log('Hello Harshal');

// __dirname → current folder ka full path deta hai
// __filename → current file ka full path deta hai
console.log(__dirname , __filename)

// fs.writeFile → asynchronous (non-blocking) file write operation
// write.txt file create hogi ya existing file overwrite ho jayegi
fs.writeFile("write.txt" , "Hello world I am Harsahl It is dey-2 of my Node.js" , (err,res )=>{
    
    // Agar file write karte waqt error aata hai
    if(err){
        console.log(err)
    }
    // Success case me kuch return nahi hota
})

// setTimeout → global object ka function hai
// Ye given delay (2000ms = 2 sec) ke baad ek hi baar execute hota hai
setTimeout(()=>{

    console.log("hello i am from global")  
    // Ye line exactly 2 second baad print hogi
},2000)

// Normal variable for counting
let count = 0;

// setInterval → given time interval par bar-bar execute hota hai
// Yaha har 1000ms (1 sec) me run karega
const interval = setInterval(()=>{
    
    console.log(`Interval Count: ${++count}` )   
    // Har execution me count increase ho raha hai

    // Jab count 4 ho jaye
    if(count===4){
        // setInterval ko stop kar dete hain
        clearInterval(interval)
    }
},1000)

// global object ko dekhne ke liye (commented)
// console.log(global);

// Ye bhi synchronous statement hai
// Event loop start hone se pehle hi execute ho jayega
console.log("Hello")
