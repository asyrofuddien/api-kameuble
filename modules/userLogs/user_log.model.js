const mongoose = require('mongoose');

const usersLogSchema = new mongoose.Schema(
  {
    request: { type: String, default: '' },
    user_id: { type: mongoose.Types.ObjectId, ref: 'user' },
    body: { type: String, ref: 'user' },
    api: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user_log', usersLogSchema);
