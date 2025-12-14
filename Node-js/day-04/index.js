const http = require("http"); 
// http module → server banane ke liye use hota hai

const fs = require("fs"); 
// fs (File System) → files read / write karne ke liye

const { Transform, pipeline } = require("stream"); 
// stream module se:
// Transform → data ko modify karne ke liye
// pipeline → multiple streams ko safely connect karne ke liye

const server = http.createServer((req, res) => {
  // Jab bhi client request karega ye callback chalega

  // ?--------1---------

  // !1. Downloading file in a bad way❌
  // Poor approach kyunki poori file ek saath memory me load hoti hai
  // const file = fs.readFileSync("sample.txt");
  // res.end(file);

  // *2. Downloading file in a good way (stream) ✅
  // File chunks me load hogi → memory efficient
  // const readableStream = fs.createReadStream("sample.txt")
  // readableStream.pipe(res)   
  // pipe → readable stream ka data directly writable stream me bhej deta hai
  // yaha res ek writable stream hai
  // res.end()

  // STREAM CONCEPT 👇
  // Stream do type ke hote hai:
  // 1. Readable stream → data read karta hai
  // 2. Writable stream → data write karta hai

  // pipe() method:
  // LHS → readable stream
  // RHS → writable stream

  // req --> readable stream hota hai (client se data aata hai)
  // res --> writable stream hota hai (client ko data bhejte hai)

  // ? -------- 2 ---------

  // !1. Copy file in a bad way❌
  // Poor approach → large file ho to memory waste hoti hai
  // const file = fs.readFileSync("sample.txt")
  // fs.writeFileSync("output.txt" , file)
  // res.end()

  // *2. Copy file in a good way (stream) ✅
  // File chunks me read aur write hoti hai

  // const readStream = fs.createReadStream("sample.txt");  
  // const writeStream = fs.createWriteStream("output.txt");

  // readStream.on("data" , (chunk)=>{
  //   "data" event tab fire hota hai jab new chunk milta hai
  //   chunk matlab file ka chhota part
  //   console.log("CHUNK: " , chunk)
  //   writeStream.write(chunk); 
  //   Har chunk output file me write hota rahega
  // })

  // ? --------- 3 --------- String Processing ---------
  // Requirement:
  // 1. Text ko uppercase me convert karna
  // 2. "ipsum" ko replace karke "Harshal" likhna

  // yaha se uncomment 
  const readStream = fs.createReadStream("sample.txt"); 
  // sample.txt ko readable stream me open kiya

  const writeStream = fs.createWriteStream("output.txt");
  // output.txt ko writable stream me open kiya

  const tranformStream = new Transform({
    // Transform stream → readable + writable dono hota hai

    transform(chunk, encoding, callback) {
      // chunk → aaya hua data ka piece
      // encoding → encoding type (mostly buffer hota hai)
      // callback → batata hai transform complete hua ya nahi

      const modifiedWord = chunk
        .toString()                  // Buffer → string
        .toUpperCase()               // Saara text uppercase
        .replaceAll(/ipsum/gi, "Harshal"); 
        // ipsum ko Harshal se replace (case-insensitive)

      callback(null, modifiedWord);  
      // null → error nahi hai
      // modifiedWord → next stream ko bhejna
    }
  });

  // ! Bad Approach ❌
  // Manual data handling → error handling mushkil ho jata hai
  // readStream.on("data" , (chunk)=>{
  //   const modifiedWord = chunk.toString().toUpperCase().replaceAll(/ipsum/gi , "Hashal")
  //   writeStream.write(modifiedWord)
  // })

  // Best Approach ✅
  // readStream → transformStream → writeStream
  // pipe automatically flow manage karta hai

  // readStream.pipe(tranformStream).pipe(writeStream);

  pipeline(readStream, tranformStream,pipeline,(err) => {
      // Agar pipeline me koi error aata hai to yaha handle hota hai
    console.log(err);
    }
  );

  res.end(); 
  // Client ko response end kar diya
});

server.listen(4000, () => {
  // Server 4000 port pe listen kar raha hai
  console.log("Server is connected at ", 4000);
});
