const Product = require('../models/Product');

class ProductService {
 static async getAll(filters = {}, limit = 0, sort = {}, skip = 0) {
  return await Product.find(filters)
    .populate('category_id brand_id product_type_id')
    .sort(sort)
    .skip(skip)
    .limit(limit);
}


static async count(filters = {}) {
  return await Product.countDocuments(filters);
}

  static async getById(id) {
    const product = await Product.findById(id).populate('category_id brand_id product_type_id');
    if (!product) throw new Error('Product not found');
    return product;
  }

  static async create(data) {
    return await Product.create(data);
  }

  static async update(id, data) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new Error('Product not found');
    return product;
  }

  static async delete(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return true;
  }
}

module.exports = ProductService;