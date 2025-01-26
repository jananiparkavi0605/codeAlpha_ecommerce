const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create Order
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const order = new Order({
      user: req.user.id,
      products: cart.items,
      total,
      paymentStatus: 'Pending',
    });

    await order.save();

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

module.exports = router;
