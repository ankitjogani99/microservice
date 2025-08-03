const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { orderValidation } = require('../validations/orderValidation');

router.post('/', orderValidation, orderController.createOrder);
router.get('/', orderController.getOrders);

module.exports = router;
