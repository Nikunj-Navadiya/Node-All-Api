const express = require('express');

const routes = express.Router();

const { subcategoryAdd, subcategoryView, deletesubcategory, updatesubcategory, activesubcategory } = require('../controllers/subcategorycontroller');

routes.post('/addsubcategory', subcategoryAdd);
routes.get('/viewsubcategory', subcategoryView);
routes.delete('/deletesubcategory', deletesubcategory);
routes.put('/updatesubcategory', updatesubcategory);
routes.put('/activesubcategory', activesubcategory);


module.exports = routes;