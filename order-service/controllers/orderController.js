const { validationResult } = require('express-validator');
const axios = require('axios');
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { userId, productId, quantity } = req.body;

    // Validate user from User Service
    const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/${userId}`).catch(() => null);
    if (!userResponse || !userResponse.data) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    // Validate product from Product Service
    const productResponse = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/${productId}`).catch(() => null);
    if (!productResponse || !productResponse.data) {
      return res.status(400).json({ message: 'Invalid Product ID' });
    }

    // Create Order
    const order = await Order.create({ userId, productId, quantity, status: 'PENDING' });

    res.status(201).json({ message: 'Order created', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
