require('dotenv').config()
const { Pool } = require('pg');

const client = new Pool({
  user: process.env.USER,
  password: process.env.PW,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DB_PORT,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
});

module.exports = client;