const express = require('express');

const routes = express.Router();

const { addcategory, viewcategory, deletecategory, updatecategory, activecategory } = require('../controllers/CategoryController');

routes.post('/addcategory', addcategory);
routes.get('/viewcategory', viewcategory);
routes.delete('/deletecategory', deletecategory);
routes.put('/updatecategory', updatecategory);
routes.put('/activecategory', activecategory);

module.exports = routes;