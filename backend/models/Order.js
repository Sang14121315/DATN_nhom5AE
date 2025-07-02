const mongoose = require('mongoose');

const customerSchema = {
  name: String,
  phone: String,
  email: String,
  address: String
};

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer: customerSchema, // ✅ Phải có
  payment_method: { type: String, enum: ['cod', 'bank'], default: 'cod' },
  total: Number,
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
