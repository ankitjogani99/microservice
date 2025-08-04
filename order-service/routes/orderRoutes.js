const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { orderValidation } = require('../validations/orderValidation');

router.post('/', orderValidation, orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.patch('/:id', orderController.updateOrderStatus);

module.exports = router;
