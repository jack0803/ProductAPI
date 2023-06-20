const express = require('express');
const router = express.Router();
const { createCategory , viewByCategoryName , viewByCategoryId , listCategory , updateCategory , deleteCategoryById} = require('../controllers/category.controller.js');

router.post('/createCategory', createCategory);
router.get('/:name/viewByCategoryName' , viewByCategoryName);
router.get('/:id/viewByCategoryId', viewByCategoryId);
router.get('/listCategory', listCategory);
router.put('/:id/updateCategory' , updateCategory);
router.delete('/:id/deleteCategory' , deleteCategoryById);

module.exports = router;