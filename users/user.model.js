const mongoose = require('mongoose');

const users = new mongoose.Schema(
  {
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', users);
