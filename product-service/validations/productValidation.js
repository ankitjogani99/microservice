const { body } = require('express-validator');

exports.productValidation = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('stock').isInt({ gt: -1 }).withMessage('Stock must be 0 or positive integer')
];
