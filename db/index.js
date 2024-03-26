require('dotenv').config()
const { Client } = require('pg');

function createClient() {
  return new Client({
    user: process.env.USER,
    //password: process.env.PW,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    // idleTimeoutMillis: 0,
    // max: 500,
    // connectionTimeoutMillis: 2000,
  });
}

module.exports.createClient = createClient;
