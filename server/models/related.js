const createClient = require('../../db').createClient;
// const NodeCache = require('node-cache');
// const myCache = new NodeCache({stdTTL: 15000});

module.exports = {
  get: (product_id, callback) => {
    // value = myCache.get(product_id);

    // if (value) {
    //   callback(null, value);
    // } else {
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
              callback(null, result.rows.map((rp)=> {
                return rp.related_product_id
              }))
              // myCache.set(product_id, result.rows[0])
              client.end()
            }
          })
        })
        //.then(() => client.end())
        .catch((error)=> console.log('Error connecting to database'))
    //}

  }
}