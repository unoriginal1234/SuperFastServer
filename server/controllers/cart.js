const models = require('../models')

module.exports = {
  get: function(req, res) {
    models.cart.get((err, result) => {
      if (err) {
        console.log(err)
        res.status(501).send()
      } else {
        res.status(200).send(result)
      }
    })
  },
  post: function(req, res) {
    models.cart.post(req.body.sku_id, req.body.count, (err, result) => {
      if (err) {
        console.log(err)
        res.status(501).send()
      } else {
        res.status(201).send(result)
      }
    })
  }
}