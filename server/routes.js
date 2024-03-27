let router = require('express').Router();
let controller = require('./controllers');
const apicache = require('apicache');
let cache = apicache.middleware;

router.get('/products', cache('1 minute'), controller.products.get)

router.get('/products/:product_id', cache('1 minute'), controller.products.getById)

router.get('/cart', cache('1 minute'), controller.cart.get)

router.post('/cart', controller.cart.post)

router.get('/products/:product_id/related', cache('1 minute'), controller.related.get)

router.get('/products/:product_id/styles', cache('1 minute'), controller.styles.get)

//for loader
//router.get('')

module.exports = router;