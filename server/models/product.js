const createClient = require('../../db').createClient

module.exports = {
  getAll: (page, count, callback) => {

    let client = createClient();

    let subset = page || 1;
    let limit = count || 5;
    let value1 = limit * subset - limit + 1;
    let value2 = limit * subset;

    let query = {
        text: 'SELECT * FROM product WHERE id BETWEEN $1 AND $2',
        values: [value1, value2]
    }

    client.connect()
      .then(() => {
        client.query(query, (err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(null, result.rows);
            client.end()
          }
        });
      })
      .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
      });
    },

    getOne: (id, callback) => {
      let client = createClient();

      let query1 = {
        text: 'SELECT feature, value FROM features WHERE product_id = $1',
        values: [id]
      }
      let query2 = {
        text: 'SELECT * FROM product WHERE id = $1',
        values: [id]
      }
      client.connect()
        .then(()=> {
          client.query(query1)
          .then((features)=>{
            client.query(query2, (err, result) => {
              if (err) {
                callback(err);
              } else {
                result.rows[0]['features'] = features.rows
                callback(null, result.rows[0])
                client.end()
              }
            })
          })
          .catch((err) => callback(err))
        })
        .catch((err) => {
          console.log('Error connecting to database', err)
        })
    }
  }
