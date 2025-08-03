const { body } = require('express-validator');

exports.orderValidation = [
  body('userId').isInt({ gt: 0 }).withMessage('Valid userId is required'),
  body('productId').isInt({ gt: 0 }).withMessage('Valid productId is required'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0')
];
