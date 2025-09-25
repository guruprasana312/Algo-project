const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: String,
  brand: String,
  price: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  description: String,
  images: [String],
  specifications: mongoose.Schema.Types.Mixed,
  tags: [String],
  availability: {
    inStock: { type: Boolean, default: true },
    quantity: { type: Number, default: 0 },
    minOrderQuantity: { type: Number, default: 1 }
  },
  supplier: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    location: {
      state: String,
      city: String,
      pincode: String
    }
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  popularity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ 'supplier.location.state': 1 });

module.exports = mongoose.model('Product', productSchema);