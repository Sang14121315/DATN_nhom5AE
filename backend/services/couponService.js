const Coupon = require('../models/Coupon');

class CouponService {
  static async getAll(filters = {}) {
    return await Coupon.find(filters);
  }

  static async getById(id) {
    const coupon = await Coupon.findById(id);
    if (!coupon) throw new Error('Coupon not found');
    return coupon;
  }

  static async create(data) {
    return await Coupon.create(data);
  }

  static async update(id, data) {
    const coupon = await Coupon.findByIdAndUpdate(id, data, { new: true });
    if (!coupon) throw new Error('Coupon not found');
    return coupon;
  }

  static async delete(id) {
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) throw new Error('Coupon not found');
    return true;
  }
}

module.exports = CouponService;