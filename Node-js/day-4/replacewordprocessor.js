const { Transform } = require("stream");

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const modifiedWord = chunk
      .toString()
      .toUpperCase()
      .replaceAll(ipsum / gi, "Hello");
    callback(null, modifiedWord);
  },
});

module.exports = transformStream;
