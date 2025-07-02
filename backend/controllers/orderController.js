const OrderService = require('../services/OrderService');
const OrderDetailService = require('../services/OrderDetailService');
const CartService = require('../services/CartService');
const Joi = require('joi');

// Schema xác thực dữ liệu
const orderSchema = Joi.object({
  payment_method: Joi.string().valid('cod', 'bank').default('cod'),
  customer: Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().allow('', null),
    address: Joi.string().required()
  }).required(),
  ward: Joi.string().required(),
  district: Joi.string().required(),
  city: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      product_id: Joi.string().required(),
      quantity: Joi.number().integer().min(1).required(),
      price: Joi.number().required(),
      name: Joi.string().required(),
      img_url: Joi.string().allow('', null)
    })
  ).min(1).required(),
  total: Joi.number().required()
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
      const ordersWithDetails = await Promise.all(
        orders.map(async (order) => {
          const orderDetails = await OrderDetailService.getByOrderId(order._id);
          return {
            ...order._doc,
            items: orderDetails
          };
        })
      );

      res.status(200).json(ordersWithDetails);
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
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: 'Chưa xác thực người dùng' });

      const { customer, payment_method, items, total, ward, district, city } = req.body;
      const fullAddress = `${customer.address}, ${ward}, ${district}, ${city}`;

      const orderData = {
        user_id: userId,
        payment_method,
        total,
        status: 'pending',
        customer: {
          name: customer.name,
          phone: customer.phone,
          email: customer.email || '',
          address: fullAddress
        }
      };

      const order = await OrderService.create(orderData);

      const orderDetails = items.map(item => ({
        order_id: order._id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        img_url: item.img_url || ''
      }));

      await OrderDetailService.createMany(orderDetails);
      await CartService.clearCart(userId);

      const io = req.app.get('io');
      if (io) {
        io.to(userId.toString()).emit('new-notification', {
          user_id: userId,
          content: `Đơn hàng #${order._id} đã được tạo thành công!`,
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
      console.error('❌ Error creating order:', error);
      res.status(500).json({ message: error.message || 'Đặt hàng thất bại' });
    }
  },

  updateOrder: async (req, res) => {
    try {
      const order = await OrderService.getById(req.params.id);
      if (order.user_id.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Không có quyền sửa đơn hàng này' });
      }

      if (req.body.status === 'cancelled') {
        const createdAt = new Date(order.created_at);
        const now = new Date();
        const hoursDiff = (now - createdAt) / (1000 * 60 * 60);

        if (order.status !== 'pending') {
          return res.status(400).json({ message: 'Chỉ đơn đang chờ mới được hủy' });
        }

        if (hoursDiff > 24) {
          return res.status(400).json({ message: 'Không thể hủy đơn sau 24 giờ' });
        }
      }

      const updatedOrder = await OrderService.update(req.params.id, req.body);
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message || 'Lỗi khi cập nhật đơn hàng' });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      await OrderService.delete(req.params.id);
      res.json({ message: 'Đã xóa đơn hàng' });
    } catch (error) {
      res.status(500).json({ message: error.message || 'Lỗi khi xóa đơn hàng' });
    }
  }
};
