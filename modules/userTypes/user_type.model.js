const mongoose = require('mongoose');

const userTypes = new mongoose.Schema(
  {
    user_type: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: String, enum: ['active', 'deleted'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user_type', userTypes);
