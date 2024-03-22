const { Pool } = require('pg');

const client = new Pool({
  // user: 'username',
  // password: 'password',
  host: '127.0.0.1',
  port: 5432,
  database: 'mydb',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = client;