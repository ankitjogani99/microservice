const { validationResult } = require('express-validator');
const axios = require('axios');
const { default: axiosRetry } = require('axios-retry');
const Order = require('../models/order');

const axiosInstance = axios.create({ timeout: 3000 }); // 3 seconds timeout
axiosRetry(axiosInstance, {
  retries: 1,
  retryDelay: axiosRetry.exponentialDelay,
}); // Retry 2 times

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { userId, productId, quantity } = req.body;

  try {
    console.log(
      `Creating order for User:${userId} Product:${productId} Qty:${quantity}`
    );

    // 1️⃣ Validate User
    let userResponse;
    try {
      userResponse = await axiosInstance.get(
        `${process.env.USER_SERVICE_URL}/${userId}`
      );
    } catch (error) {
      console.error(`User Service failed: ${error.message}`);
      return res
        .status(503)
        .json({ message: 'User Service is unavailable, try again later' });
    }

    if (!userResponse.data) {
      return res.status(400).json({ message: 'Invalid User ID' });
    }

    // 2️⃣ Validate Product
    let productResponse;
    try {
      productResponse = await axiosInstance.get(
        `${process.env.PRODUCT_SERVICE_URL}/${productId}`
      );
    } catch (error) {
      console.error(`Product Service failed: ${error.message}`);
      return res
        .status(503)
        .json({ message: 'Product Service is unavailable, try again later' });
    }

    if (!productResponse.data) {
      return res.status(400).json({ message: 'Invalid Product ID' });
    }

    // Optional: Check stock
    if (productResponse.data.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // 3️⃣ Create Order
    const order = await Order.create({
      userId,
      productId,
      quantity,
      status: 'PENDING',
    });

    console.log(`✅ Order created: ${order.id}`);

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error('Order creation failed:', err.message);
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: err.message });
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

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
