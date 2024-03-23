require('dotenv').config()
const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;

let inputFile = path.join(__dirname, '../data/imported/photos.csv');
//var inputFile = path.join(__dirname, './data/cleaned/cleanStyles.csv');
let table = 'photos';
// Connect to the database

const client = new Pool({
  user: process.env.USER,
  password: process.env.PW,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

client.connect()
let stream = client.query(copyFrom(`COPY ${table} FROM STDIN WITH (FORMAT csv, HEADER)`))
let fileStream = fs.createReadStream(inputFile)

fileStream.on('error', (error) =>{
  console.log(`Error in reading file: ${error}`)
})

stream.on('error', (error) => {
  console.log(`Error in copy command: ${error}`)
})

stream.on('end', () => {
  console.log(`Completed loading data into ${targetTable}`)
  client.end()
})

fileStream.pipe(stream);
// const copyQuery = "COPY 'features' FROM './data/imported/features.csv' WITH (FORMAT csv, HEADER)"

// let promise2 = client.query(copyQuery).then(console.log('did it')).catch((err)=>console.log(err))


// client.connect()
//   .then(()=> {await promise2})
//   .catch((error)=>console.log(error))
//   .then(()=>client.end())