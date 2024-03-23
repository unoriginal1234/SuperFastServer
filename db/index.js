require('dotenv').config()
const { Pool } = require('pg');

const client = new Pool({
  // user: 'username',
  // password: 'password',
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB_PORT,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

module.exports = client;