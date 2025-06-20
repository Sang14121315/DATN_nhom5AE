const OrderService = require('../services/OrderService');
const OrderDetailService = require('../services/OrderDetailService');
const CouponService = require('../services/CouponService');
const CartService = require('../services/CartService');
const Joi = require('joi');

const orderSchema = Joi.object({
  payment_method: Joi.string().valid('cod', 'vnpay').default('cod'),
  coupon_code: Joi.string().optional()
});

module.exports = {
  getOrders: async (req, res) => {
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

      const orders = await OrderService.getAll(filters);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Error fetching orders' });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await OrderService.getById(req.params.id);
      const orderDetails = await OrderDetailService.getByOrderId(req.params.id);
      res.json({ order, orderDetails });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Error fetching order' });
    }
  },

  createOrder: async (req, res) => {
    try {
      const { error } = orderSchema.validate(req.body);
      if (error) return res.status(400).json({ message: error.details[0].message });

      const { payment_method, coupon_code } = req.body;
      const userId = req.user.id;

      const cart = await CartService.getCart(userId);
      if (!cart || !cart.items.length) throw new Error('Cart is empty');

      let total = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
      let discount = 0;
      let coupon = null;

      if (coupon_code) {
        const couponResult = await CouponService.validateAndApply(coupon_code, total, userId);
        coupon = couponResult.coupon;
        discount = couponResult.discount;
        total -= discount;
      }

      const orderData = {
        user_id: userId,
        total,
        discount,
        coupon_id: coupon ? coupon._id : null,
        status: 'pending'
      };
      const order = await OrderService.create(orderData);

      const orderDetails = cart.items.map(item => ({
        order_id: order._id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      }));
      await OrderDetailService.createMany(orderDetails);

      await CartService.clearCart(userId);

      const io = req.app.get('io');
      if (io) {
        io.to(userId.toString()).emit('new-notification', {
          user_id: userId,
          content: `Order #${order._id} created successfully!`,
          type: 'order_placed',
          related_id: order._id,
          related_model: 'Order',
          related_action: 'view_order'
        });
        io.to('admin').emit('new-order', {
          order_id: order._id,
          user_id: userId,
          total,
          status: order.status,
          created_at: order.created_at
        });
      }

      res.status(201).json({ order, orderDetails });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Error creating order' });
    }
  },

  updateOrder: async (req, res) => {
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
  },

  deleteOrder: async (req, res) => {
    try {
      await OrderService.delete(req.params.id);
      res.json({ message: 'Order deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Error deleting order' });
    }
  }
};
