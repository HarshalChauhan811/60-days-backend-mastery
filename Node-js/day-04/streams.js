// How to create our own stream 
// Yaha hum Node.js me apni custom stream bana rahe hain

const { Readable , Writable } = require("stream");
// stream module se Readable aur Writable streams import ki

const readableStream = new Readable({
  // highWaterMark → buffer ka size define karta hai
  // matlab ek baar me kitna data memory/buffer me rakha ja sakta hai
  // yaha 6 bytes ka buffer banaya hai
  highWaterMark: 6,  

  // read() method mandatory hota hai
  // yaha empty hai kyunki hum manually data push kar rahe hain
  read() {},
});

const writableStream = new Writable({
    // write() method tab call hota hai
    // jab readable stream se data writable stream me aata hai
    write(streamData){
        // streamData → buffer form me aata hai
        console.log("Writing..." , streamData.toString())
        // buffer ko string me convert karke print kar rahe hain
    }
})

// readable stream jab bhi data emit karega
// "data" event trigger hoga
readableStream.on("data", (chunk) => {
  // chunk → readable stream se aaya hua data ka ek part
  console.log("CHUNK ", chunk.toString());
  
  // jo data readable se aaya
  // wahi writable stream me write kar diya
  writableStream.write(chunk)
});

// readableStream.push() → manually data readable stream me daalne ke liye
// "Hello" ko stream ke andar push kar rahe hain
// return value true/false batati hai
// buffer full hua ya nahi (backpressure concept)
console.log(readableStream.push("Hello"));     
