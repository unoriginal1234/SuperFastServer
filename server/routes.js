let router = require('express').Router();
let controller = require('./controllers');

router.get('/products', controller.products.get)

router.get('/products/:product_id', controller.products.getById)

router.get('/cart', controller.cart.get)

router.get('/related', controller.related.get)

router.get('/product/:product_id/styles', controller.styles.get)

module.exports = router;