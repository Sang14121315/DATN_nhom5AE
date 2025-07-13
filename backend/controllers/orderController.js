const OrderService = require('../services/orderService');
const OrderDetailService = require('../services/OrderDetailService');
const CartService = require('../services/CartService');
const UserService = require('../services/UserService');
const Joi = require('joi');
const { createMomoPayment } = require('../services/orderService');

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
      quantity: Joi.number().min(1).required(),
      price: Joi.number().required(),
      name: Joi.string().required(),
      img_url: Joi.string().allow('', null)
    })
  ).min(1).required(),
  total: Joi.number().required()
});

exports.getOrders = async (req, res) => {
  try {
    const { status, minTotal, maxTotal, sort = 'created_at', order = 'desc' } = req.query;
    const filters = {};
    // Nếu là user thường, chỉ trả về đơn của user đó
    if (req.user && req.user.role !== 'admin') {
      filters.user_id = req.user.id;
    } else if (req.query.user_id) {
      filters.user_id = req.query.user_id;
    }
    if (status) filters.status = status;
    if (minTotal || maxTotal) {
      filters.total = {};
      if (minTotal) filters.total.$gte = Number(minTotal);
      if (maxTotal) filters.total.$lte = Number(maxTotal);
    }
    // Truyền sort vào service
    const sortObj = { [sort]: order === 'asc' ? 1 : -1 };
    const orders = await OrderService.getAll(filters, sortObj);
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const details = await OrderDetailService.getByOrderId(order._id);
        const user = await UserService.getById(order.user_id);
        return {
          ...order._doc,
          items: details,
          user: user // rename for clarity
        };
      })
    );
    res.status(200).json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi khi lấy đơn hàng' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    const items = await OrderDetailService.getByOrderId(order._id);

    res.json({
      _id: order._id,
      customer: order.customer,
      payment_method: order.payment_method,
      total: order.total,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
      items: items.map(item => ({
        _id: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        img_url: item.img_url
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi khi lấy đơn hàng' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Bạn chưa đăng nhập' });

    const { customer, payment_method, items, total, ward, district, city } = req.body;
    const fullAddress = `${customer.address}, ${ward}, ${district}, ${city}`;

    const order = await OrderService.create({
      user_id: userId,
      payment_method,
      total,
      status: 'pending',
      customer: {
        ...customer,
        address: fullAddress
      },
      ward,
      district,
      city
    });

    const detailDocs = items.map(item => ({
      order_id: order._id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      img_url: item.img_url || '',
    }));

    await OrderDetailService.createMany(detailDocs);
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

    res.status(201).json({ order, orderDetails: detailDocs });
  } catch (error) {
    console.error('❌ Lỗi tạo đơn hàng:', error);
    res.status(500).json({ message: error.message || 'Lỗi tạo đơn hàng' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await OrderService.getById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    if (req.body.status === 'cancelled' && order.status !== 'pending') {
      return res.status(400).json({ message: 'Chỉ được hủy đơn đang chờ' });
    }

    const updated = await OrderService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi cập nhật đơn hàng' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await OrderService.delete(req.params.id);
    res.json({ message: 'Đã xóa đơn hàng' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi khi xóa đơn hàng' });
  }
};

exports.createMomoOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Bạn chưa đăng nhập' });

    const { customer, payment_method, items, total, ward, district, city } = req.body;
    const fullAddress = `${customer.address}, ${ward}, ${district}, ${city}`;

    // Tạo đơn hàng thực sự trong database
    const order = await OrderService.create({
      user_id: userId,
      payment_method,
      total,
      status: 'pending',
      customer: {
        ...customer,
        address: fullAddress
      },
      ward,
      district,
      city
    });

    const detailDocs = items.map(item => ({
      order_id: order._id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      img_url: item.img_url || '',
    }));

    await OrderDetailService.createMany(detailDocs);
    await CartService.clearCart(userId);

    // Tạo payment URL với MoMo
    const paymentUrl = await createMomoPayment({
      orderId: order._id.toString(),
      amount: total,
      orderInfo: `Thanh toán đơn hàng #${order._id}`,
      returnUrl: `${req.protocol}://${req.get('host')}/momo-callback`,
      ipnUrl: `${req.protocol}://${req.get('host')}/api/momo/webhook`
    });

    res.json({ 
      order, 
      orderDetails: detailDocs,
      paymentUrl 
    });
  } catch (error) {
    console.error('❌ Lỗi tạo đơn hàng MoMo:', error);
    res.status(500).json({ message: error.message || 'Lỗi tạo đơn hàng MoMo' });
  }
};

exports.momoWebhook = async (req, res) => {
  try {
    const { orderId, resultCode, message, amount, transId } = req.body;
    
    if (resultCode === 0) {
      // Thanh toán thành công
      await OrderService.update(orderId, { 
        status: 'paid',
        payment_status: 'completed',
        momo_trans_id: transId
      });
      
      const io = req.app.get('io');
      if (io) {
        io.to('admin').emit('payment-success', {
          order_id: orderId,
          amount,
          trans_id: transId
        });
      }
    } else {
      // Thanh toán thất bại
      await OrderService.update(orderId, { 
        status: 'cancelled',
        payment_status: 'failed'
      });
    }
    
    res.json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('❌ Lỗi xử lý webhook MoMo:', error);
    res.status(500).json({ message: 'Webhook error' });
  }
};
