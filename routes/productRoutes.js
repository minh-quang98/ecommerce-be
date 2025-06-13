const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/getAllProducts', getAllProducts);
router.post('/createProduct', createProduct);

module.exports = router;