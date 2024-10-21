const express = require('express');

const routes = express.Router();

const { addcart, viewcart, deletecart, updatecart } = require('../controllers/cartController');

routes.post('/addcart', addcart)
routes.get('/viewcart', viewcart)
routes.delete('/deletecart', deletecart)
routes.put('/updatecart', updatecart)

module.exports = routes;