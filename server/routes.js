let router = require('express').Router();
let controller = require('./controllers');

router.get('/products', controller.products.get)

router.get('/products/:product_id', controller.products.getById)

router.get('/cart', controller.cart.get)

router.post('/cart', controller.cart.post)

router.get('/products/:product_id/related', controller.related.get)

router.get('/products/:product_id/styles', controller.styles.get)

module.exports = router;