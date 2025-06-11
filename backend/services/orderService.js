const Order = require('../models/Order');

class OrderService {
  static async getAll(filters = {}) {
    return await Order.find(filters).populate('user_id coupon_id');
  }

  static async getById(id) {
    const order = await Order.findById(id).populate('user_id coupon_id');
    if (!order) throw new Error('Order not found');
    return order;
  }

  static async create(data) {
    return await Order.create(data);
  }

  static async update(id, data) {
    const order = await Order.findByIdAndUpdate(id, data, { new: true });
    if (!order) throw new Error('Order not found');
    return order;
  }

  static async delete(id) {
    const order = await Order.findByIdAndDelete(id);
    if (!order) throw new Error('Order not found');
    return true;
  }
}

module.exports = OrderService;