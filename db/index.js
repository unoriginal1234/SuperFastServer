require('dotenv').config()
const { Client } = require('pg');

const client = new Client({
  // user: 'username',
  // password: 'password',
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

module.exports = client;