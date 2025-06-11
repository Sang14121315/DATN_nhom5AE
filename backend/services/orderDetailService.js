const OrderDetail = require('../models/OrderDetail');

class OrderDetailService {
  static async getAll() {
    return await OrderDetail.find().populate('product_id');
  }

  static async getByOrderId(orderId) {
    const detail = await OrderDetail.find({ order_id: orderId }).populate('product_id');
    if (!detail) throw new Error('Order detail not found');
    return detail;
  }
}

module.exports = OrderDetailService;