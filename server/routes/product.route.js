const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST request to add a new product
router.post('/', productController.addProduct);

module.exports = router;
