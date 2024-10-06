const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, default: '' },
    price: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    store_id: { type: mongoose.Types.ObjectId, ref: 'store' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
