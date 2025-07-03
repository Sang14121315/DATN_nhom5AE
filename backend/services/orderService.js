const Order = require('../models/Order'); // ✅ Phải là object được export ở trên

class OrderService {
  static async getAll(filters = {}) {
    return await Order.find(filters).populate('user_id');
  }

  static async getById(id) {
    const order = await Order.findById(id).populate('user_id');
    if (!order) throw new Error('Order not found');
    return order;
  }

  static async create(data) {
    return await Order.create(data);
  }

  static async update(id, data) {
    const updated = await Order.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error('Order not found');
    return updated;
  }

  static async delete(id) {
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) throw new Error('Order not found');
    return true;
  }
}

module.exports = OrderService;
