const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    products: [
      {
        product_id: { type: mongoose.Types.ObjectId, ref: 'product' },
        total_product: { type: Number, default: 0 },
      },
    ],
    status: { type: String, enum: ['active', 'deleted'], default: 'active' },
    total_price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('cart', cartSchema);
