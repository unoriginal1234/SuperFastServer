const createClient = require('../../db').createClient

module.exports = {
  get: (product_id, callback) => {
    let client = createClient();
    let query = {
      text: 'SELECT related_product_id FROM related WHERE current_product_id = $1',
      values: [product_id]
    }
    client.connect()
      .then(()=>{
        client.query(query, (err, result) => {
          if (err) {
            callback(err)
          } else {
            newArr = result.rows.map((rp)=> {
              return rp.related_product_id
            })
            callback(null, newArr)
            client.end()
          }
        })
      })
      .catch((error)=> console.log('Error connecting to database'))
  }
}