const models = require('../models')

module.exports = {
  get: function(req, res) {
    models.styles.get(req.params.product_id, (err, result) => {
      if (err) {
        console.log(err)
        res.status(501).send()
      } else {
        res.status(200).send(result)
      }
    })
  }
}