const createClient = require('../../db').createClient

module.exports = {
  get: (callback) => {
    let client = createClient()
    let query = {
      text: 'SELECT * FROM cart'
    }
    client.connect()
      .then(()=>{
        client.query(query, (err, result) => {
          if (err) {
            callback(err)
          } else {
            callback(null, result.rows)
            client.end()
          }
        })
      })
      .catch((error)=> console.log('Error connecting to database'))
  },
  post: (sku_id, count, callback) => {
    let client = createClient()
    let query = {
      text: 'INSERT INTO cart (sku_id, count) VALUES ($1, $2)',
      values: [sku_id, count]
    }
    client.connect()
      .then(()=>{
        client.query(query, (err, result) => {
          if (err) {
            callback(err)
          } else {
            callback(null, 'Cart successfully updated')
            client.end()
          }
        })
      })
      .catch((error)=> console.log('Error connecting to database'))
  }
}