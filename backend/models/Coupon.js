const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount_type: { type: String, enum: ['fixed', 'percentage'], required: true },
  discount_value: { type: Number, required: true },
  max_uses: { type: Number, default: 1 },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired', 'used'], default: 'active' },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);