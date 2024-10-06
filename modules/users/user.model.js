const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
  {
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    user_type: { type: mongoose.Types.ObjectId, ref: 'user_type' },
    addresses: [
      {
        address: { type: String, default: '' },
        city: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', usersSchema);
