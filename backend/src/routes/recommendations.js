const express = require('express');
const axios = require('axios');
const Product = require('../models/Product');
const router = express.Router();

// Get personalized recommendations
router.get('/personalized/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, category } = req.query;

    // Call AI service for recommendations
    const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/recommend`, {
      userId,
      category,
      limit: parseInt(limit)
    });

    const productIds = aiResponse.data.recommendations;
    const products = await Product.find({ _id: { $in: productIds } })
      .populate('supplier.id', 'name')
      .lean();

    res.json({
      success: true,
      recommendations: products,
      algorithm: aiResponse.data.algorithm
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Get trending products
router.get('/trending', async (req, res) => {
  try {
    const { state, category, limit = 20 } = req.query;
    
    let query = {};
    if (state) query['supplier.location.state'] = state;
    if (category) query.category = category;

    const products = await Product.find(query)
      .sort({ popularity: -1, 'ratings.average': -1 })
      .limit(parseInt(limit))
      .populate('supplier.id', 'name')
      .lean();

    res.json({ success: true, trending: products });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get trending products' });
  }
});

// Similar products
router.get('/similar/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { limit = 8 } = req.query;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const similar = await Product.find({
      _id: { $ne: productId },
      $or: [
        { category: product.category },
        { tags: { $in: product.tags } },
        { brand: product.brand }
      ]
    })
    .limit(parseInt(limit))
    .lean();

    res.json({ success: true, similar });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get similar products' });
  }
});

module.exports = router;