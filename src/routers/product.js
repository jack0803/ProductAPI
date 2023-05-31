//Task
//perform CRUD opration
//find product with SKU
//search product using name or SKU
//apply pagination in product list
const express = require('express');
const router = express.Router();
const { create , welcome , update , deleteById , viewById , list , viewByName} = require('../controllers/product.controller.js');

router.post('/create', create);
router.get('/', welcome);
router.get('/:name/viewName' , viewByName);
router.get('/:id/view', viewById);
router.get('/list', list);
router.put('/:id/update' , update);
router.delete('/:id/delete' , deleteById);

module.exports = router;