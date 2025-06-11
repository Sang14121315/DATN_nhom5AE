const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: { type: String, enum: ['order_placed', 'order_cancelled', 'user_feedback', 'other'], required: true },
  related_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'related_model' }, // Liên kết với Order hoặc User
  related_model: { type: String, enum: ['Order', 'User'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);