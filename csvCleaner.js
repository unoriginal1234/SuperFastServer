const csv = require("csv-parser");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const fs = require('fs');
const Transform = require("stream").Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "productId", title: "productId" },
    { id: "name", title: "name" },
    { id: "sale_price", title: "sale_price" },
    { id: "original_price", title: "original_price" },
    { id: "default_style", title: "default_style" },
  ],
});

let readStream = fs.createReadStream("./data/imported/styles.csv");
let writeStream = fs.createWriteStream("./data/cleaned/cleanStyles.csv")

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, next) {
    // for (let key in chunk) {
    //   //trims whitespace
    //   let trimKey = key.trim();
    //   chunk[trimKey] = chunk[key];
    //   if (key !== trimKey) {
    //     delete chunk[key];
    //   }
    // }
    //filters out all non-number characters
    let onlyNumbers = chunk.sale_price.replace('null', "");
    chunk.sale_price = onlyNumbers;
    //uses our csvStringifier to turn our chunk into a csv string
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
  }
}



const transformer = new CSVCleaner({ writableObjectMode: true });

//write header
writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });