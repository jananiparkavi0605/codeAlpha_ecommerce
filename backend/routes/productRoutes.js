const express = require('express');
const Product = require('../models/product');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Add New Product (Admin Only)
router.post('/add', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });

  const { name, description, price, image } = req.body;

  try {
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Update Product (Admin Only)
router.put('/update/:id', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });

  const { id } = req.params;
  const { name, description, price, image } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Delete Product (Admin Only)
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied' });

  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

module.exports = router;
