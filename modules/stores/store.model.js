const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    store_name: { type: String, default: '' },
    address: {
      address: { type: String, default: '' },
      city: { type: String, default: '' },
    },
    user_id: { type: mongoose.Types.ObjectId, ref: 'user' },
    rates: [
      {
        stars: { type: Number, default: 0, max: 5 },
        comment: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('store', storeSchema);
