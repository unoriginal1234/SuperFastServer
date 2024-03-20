const { Client } = require('pg');

const client = new Client({
  // user: 'username',
  // password: 'password',
  host: '127.0.0.1',
  port: 5432,
  database: 'mydb',
});

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');

    // Execute SQL queries here

    client.query('SELECT * FROM photos', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }
      // Close the connection when done
      client.end()
        .then(() => {
          console.log('Connection to PostgreSQL closed');
        })
        .catch((err) => {
          console.error('Error closing connection', err);
        });
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });