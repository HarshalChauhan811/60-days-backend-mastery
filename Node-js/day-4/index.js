const http = require("http");
const fs = require("fs");
const { Transform ,pipeline} = require("stream");

const server = http.createServer((req, res) => {
  // ?------1----------

  // !1. Downloading  file bad way
  // const file = fs.readFileSync('sample.txt')
  // return res.end(file);

  // *2. Downloading file good using good way (streams)

  // const reabableStream = fs.createReadStream("sample.txt")

  // (req)readbalestream --> (res)writablestream
  // reabableStream.pipe(res)

  // ?--------2---------
  // !1. Copy big file using bad way
  // const file = fs.readFileSync('sample.txt');
  // fs.writeFileSync('output.txt', file);
  // res.end()

  //*2. Copy big file good way
  // const readStream = fs.createReadStream('sample.txt');
  // const writeStream = fs.createWriteStream('output.txt');

  // readStream.on('data', (chunk) => {
  //     console.log('Chunk: ', chunk.toString());
  //     writeStream.write(chunk);
  // });

  // ?---------String processing----------
  // Uppercase()
  // ipsum word replace to another word
  const samplefilestream = fs.createReadStream("sample.txt");
  const outputwritablestream = fs.createWriteStream("output.txt");

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const modifiedWord = chunk.toString().toUpperCase().replaceAll(ipsum/gi , "Hello")
        callback(null , modifiedWord)
    },
  });

  cons;

  // !Bad way to tranforming chunks
  // samplefilestream.on("data" , (chunk)=>{
  //     const modifiedWord = chunk.toString().toUpperCase().replaceAll(ipsum/gi , "Hello")
  //     outputwritablestream.write(modifiedWord)
  // })

  samplefilestream.pipe(transformStream).pipe(outputwritablestream);

  res.end();
});

server.listen(8080, () => {
  console.log("Server is started");
});
