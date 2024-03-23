// will have to require models
let models = require('../models')

module.exports = {
  get: function(req, res) {
    models.product.getAll(req.query.page, req.query.count, (err, result) => {
      if (err) {
        console.log(err)
        res.status(501).send()
      } else {
        res.status(200).send(result)
      }
    })
  },
  getById: function(req, res) {
    models.product.getOne(req.params.product_id, (err, result) => {
      if (err) {
        console.log(err)
        res.status(501).send()
      } else {
        res.status(200).send(result)
      }
    })
  }
}

