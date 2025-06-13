const OrderService = require('../services/orderService');
const OrderDetailService = require('../services/orderDetailService');
const CouponService = require('../services/couponService')
const Joi = require('joi');

const orderSchema = Joi.object({
  user_id: Joi.string().required(),
  total: Joi.number().required(),
  status: Joi.string().valid('pending', 'completed', 'cancelled'),
  coupon_code: Joi.string().optional(),
  items: Joi.array().items(
    Joi.object({
      product_id: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required()
    })
  ).required()
});

// Lấy danh sách đơn hàng theo filter
const getOrders = async (req, res) => {
  try {
    const { user_id, status, minTotal, maxTotal } = req.query;
    const filters = {};

    if (user_id) filters.user_id = user_id;
    if (status) filters.status = status;
    if (minTotal || maxTotal) {
      filters.total = {};
      if (minTotal) filters.total.$gte = Number(minTotal);
      if (maxTotal) filters.total.$lte = Number(maxTotal);
    }

    const orders = await OrderService.getOrders(filters);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching orders' });
  }
};

// Lấy chi tiết đơn hàng theo ID
const getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getById(req.params.id);
    const orderDetails = await OrderDetailService.getByOrderId(req.params.id);
    res.json({ order, orderDetails });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching order' });
  }
};

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let { user_id, total, coupon_code, items } = req.body;
    let discount = 0;
    let coupon = null;

    if (coupon_code) {
      const couponResult = await CouponService.validateAndApply(coupon_code, total, user_id);
      coupon = couponResult.coupon;
      discount = couponResult.discount;
      total -= discount;
    }

    const orderData = {
      user_id,
      total,
      discount,
      coupon_id: coupon ? coupon._id : null,
      status: 'pending'
    };

    const order = await OrderService.create(orderData);

    const orderDetails = items.map(item => ({
      order_id: order._id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    await OrderDetailService.createMany(orderDetails);

    const io = req.app.get('io');
    if (io) {
      io.to(user_id.toString()).emit('new-notification', {
        user_id,
        content: `Order #${order._id} created successfully!`,
        type: 'order_placed',
        related_id: order._id,
        related_model: 'Order',
        related_action: 'view_order'
      });
    }

    res.status(201).json({ order, orderDetails });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating order' });
  }
};

// Cập nhật đơn hàng
const updateOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const order = await OrderService.getById(req.params.id);
    if (order.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized to update this order' });
    }

    if (req.body.status === 'cancelled') {
      const createdAt = new Date(order.created_at);
      const now = new Date();
      const hoursDiff = (now - createdAt) / (1000 * 60 * 60);

      if (order.status !== 'pending') {
        return res.status(400).json({ message: 'Only pending orders can be cancelled' });
      }

      if (hoursDiff > 24) {
        return res.status(400).json({ message: 'Order cannot be cancelled after 24 hours' });
      }
    }

    const updatedOrder = await OrderService.update(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating order' });
  }
};

// Xóa đơn hàng
const deleteOrder = async (req, res) => {
  try {
    await OrderService.delete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting order' });
  }
};

// ✅ Export rõ ràng cuối file
module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
