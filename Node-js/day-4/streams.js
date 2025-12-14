const {Readable, Writable} = require('stream');

const readableStream = new Readable({
    objectMode: true,
    highWaterMark: 2,
    read() {}
});

// const writableStream = new Writable({
//     write(s) {
//         console.log('writting: ', s.toString())
//     }
// });

readableStream.on('data', (chunk) => {
    console.log('data: ', chunk);
    // console.log('Data comming: ', <chunk className="toSt"></chunk>ring());
    // writableStream.write(chunk);
});

console.log(readableStream.push({
    name: 'Rakesh'
}))




