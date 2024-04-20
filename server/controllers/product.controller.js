const Product = require('../models/Product');

// Controller function to add a new product
exports.addProduct = async (req, res) => {
  try {
    const { productId, productName, productPrice } = req.body;
    const product = new Product({ productId, productName, productPrice });
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
