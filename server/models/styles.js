const createClient = require('../../db').createClient;
const styleFilter = require('../helpers/styleFilter.js').styleFilter;
// const NodeCache = require('node-cache');
// const myCache = new NodeCache({stdTTL: 15000});

module.exports = {
  get: (productId, callback) => {
    // value = myCache.get(productId);

    // if(value) {
    //   callback(null, value)
    // } else {
      let client = createClient()
      let query1 = {
        text: 'SELECT * FROM styles WHERE productid = $1',
        values: [productId]
      }
      let query2 = {
        text: 'SELECT photos.styleid, photos.url, photos.thumbnail_url FROM photos JOIN styles ON styles.id = photos.styleid WHERE styles.productid = $1',
        values: [productId]
      }
      let query3 = {
        text: 'SELECT skus.styleid, skus.size, skus.quantity FROM skus JOIN styles ON skus.styleid = styles.id WHERE styles.productid = $1',
        values: [productId]
      }
      client.connect()
        .then(()=>{
          client.query(query1, (err, result)=> {
            if (err) {
              callback(err)
            } else {
              let styles = result.rows
              client.query(query2, (err, result) => {
                if (err) {
                  callback(err)
                } else {
                  let photos = result.rows
                  client.query(query3, (err, result) => {
                    if (err) {
                      callback(err)
                    } else {
                      let skus = result.rows;
                      styleFilter(styles, photos, skus)
                      callback(null, styles)
                      // myCache.set(productId, styles)
                      client.end()
                    }
                  })
                }
              })
            }
          })
        })
        // .then(()=> client.end())
        .catch((error)=> console.log('Error connecting to database'))
    //}
  }
}