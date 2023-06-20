const express = require('express');
const router = express.Router();
const productRouter = require('./product.js');
const  categoryRouter = require('./category.js');
const errorHelper = require('../helper/error.helper.js');


router.use('/product', productRouter);
router.use('/product', categoryRouter)
router.use(errorHelper);

module.exports = router

