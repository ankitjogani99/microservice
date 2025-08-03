const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { productValidation } = require('../validations/productValidation');

router.post('/', productValidation, productController.addProduct);
router.get('/', productController.getProducts);

module.exports = router;
