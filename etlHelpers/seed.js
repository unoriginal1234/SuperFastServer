const fs = require('fs');
const path = require('path');
const { Pool, Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;

var inputFile = path.join(__dirname, '../data/imported/photos.csv');
//var inputFile = path.join(__dirname, './data/cleaned/cleanStyles.csv');
var table = 'photos';
// Connect to the database

const client = new Client({
  // user: 'username',
  // password: 'password',
  host: '127.0.0.1',
  port: 5432,
  database: 'mydb',
});

client.connect()
var stream = client.query(copyFrom(`COPY ${table} FROM STDIN WITH (FORMAT csv, HEADER)`))
var fileStream = fs.createReadStream(inputFile)

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