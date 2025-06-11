const OrderService = require('../services/orderService');
const Joi = require('joi');

const orderSchema = Joi.object({
  user_id: Joi.string().required(),
  total: Joi.number().required(),
  status: Joi.string().valid('pending', 'completed', 'cancelled'),
  coupon_id: Joi.string().allow('')
});

exports.getOrders = async (req, res) => {
  try {
    const { user_id, status, minTotal, maxTotal } = req.query;
    const filters = {};
    if (user_id) filters.user_id = user_id;
    if (status) filters.status = status;
    if (minTotal || maxTotal) filters.total = {};
    if (minTotal) filters.total.$gte = Number(minTotal);
    if (maxTotal) filters.total.$lte = Number(maxTotal);

    const orders = await OrderService.getAll(filters);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderService.getById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching order' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const order = await OrderService.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error creating order' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const order = await OrderService.update(req.params.id, req.body);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating order' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await OrderService.delete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error deleting order' });
  }
};