const CouponService = require('../services/couponService');
const Joi = require('joi');

const couponSchema = Joi.object({
  code: Joi.string().required(),
  discount_type: Joi.string().valid('fixed', 'percentage').required(),
  discount_value: Joi.number().required(),
  max_uses: Joi.number(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  status: Joi.string().valid('active', 'expired', 'used')
});

exports.getCoupons = async (req, res) => {
  try {
    const { code, status } = req.query;
    const filters = {};
    if (code) filters.code = new RegExp(code, 'i');
    if (status) filters.status = status;

    const coupons = await CouponService.getAll(filters);
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching coupons' });
  }
};

exports.getCouponById = async (req, res) => {
  try {
    const coupon = await CouponService.getById(req.params.id);
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching coupon' });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const { error } = couponSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const coupon = await CouponService.create(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating coupon' });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const { error } = couponSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const coupon = await CouponService.update(req.params.id, req.body);
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating coupon' });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    await CouponService.delete(req.params.id);
    res.json({ message: 'Coupon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting coupon' });
  }
};