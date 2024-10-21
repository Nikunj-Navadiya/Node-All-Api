const express = require('express');

const { verifyToken } = require('../middleware/Auth');

const routes = express();

routes.use('/', require('./authRoute'));
routes.use('/category', require('./categoryRoute'));
routes.use('/subcategory',  require('./subcategoryRoute'))
routes.use('/product',  require('./productRoute'));
routes.use('/cart', require('./cartRout'))

module.exports = routes;