const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  img_url: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Thêm trường parent
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', categorySchema);