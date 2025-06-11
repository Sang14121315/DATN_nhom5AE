const OrderService = require('../services/orderService');
const OrderDetailService = require('../services/orderDetailService'); // Giả định có service này

exports.getDashboardData = async (req, res) => {
  try {
    const orders = await OrderService.getAll();
    const orderDetails = await OrderDetailService.getAll(); // Lấy chi tiết đơn hàng

    const totalOrders = orders.length;
    const totalDelivered = orders.filter(order => order.status === 'completed').length;
    const totalCanceled = orders.filter(order => order.status === 'cancelled').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    const recentOrders = orders
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(order => {
        const detail = orderDetails.find(d => d.order_id.toString() === order._id.toString());
        return {
          _id: order._id,
          product: detail ? detail.product_id : 'N/A', // Giả định product_id từ OrderDetail
          orderNumber: order._id.slice(-6), // Lấy 6 ký tự cuối của _id làm mã đơn
          date: order.created_at,
          customer: order.user_id ? order.user_id.toString() : 'N/A', // Giả định user_id
          status: order.status === 'completed' ? 'Đã giao hàng' : order.status === 'cancelled' ? 'Đã hủy' : 'Đang xử lý',
          amount: order.total
        };
      });

    res.json({
      totalOrders,
      totalDelivered,
      totalCanceled,
      totalRevenue,
      orders: recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error fetching dashboard data' });
  }
};