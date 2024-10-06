const mongoose = require('mongoose');

const userTypes = new mongoose.Schema(
  {
    user_type: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user_type', userTypes);
