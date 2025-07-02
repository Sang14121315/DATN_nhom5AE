import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Kiểu dữ liệu chuẩn dùng cho frontend
export interface Order {
  _id: string;
  product: string;
  orderNumber: string;
  date: string;
  customer: string;
  status: string;
  amount: number;
}

// Thống kê tổng quan dashboard
export interface DashboardStats {
  totalOrders: number;
  totalDelivered: number;
  totalCanceled: number;
  totalRevenue: number;
}

// API: Lấy danh sách đơn hàng gần đây (kèm thông tin chi tiết từ orderDetails)
export const getRecentOrders = async (): Promise<Order[]> => {
  try {
    const res = await axios.get(`${API_URL}/orders`, { withCredentials: true });
    const rawOrders = res.data || [];

    const ordersWithDetails: Order[] = await Promise.all(
      rawOrders.map(async (order: any) => {
        const detailRes = await axios.get(`${API_URL}/orders/${order._id}`, {
          withCredentials: true,
        });

        const orderDetails = detailRes.data.orderDetails || [];
        const firstItem = orderDetails[0] || {};

        const productName =
          firstItem?.product_id?.name || firstItem?.name || "Không rõ sản phẩm";

        const total = orderDetails.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          _id: order._id,
          product: productName,
          orderNumber: order.code || order._id,
          date: order.created_at || order.date || new Date().toISOString(),
          customer: order.customer?.name || "Không rõ",
          status: translateStatus(order.status),
          amount: total,
        };
      })
    );

    return ordersWithDetails;
  } catch (error) {
    console.error("❌ Lỗi khi lấy đơn hàng:", error);
    throw error;
  }
};


// API: Lấy số liệu thống kê tổng quan
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await axios.get(`${API_URL}/orders/stats`, {
      withCredentials: true,
    });
    const data = response.data;

    return {
      totalOrders: data.totalOrders ?? 0,
      totalDelivered: data.totalDelivered ?? 0,
      totalCanceled: data.totalCanceled ?? 0,
      totalRevenue: data.totalRevenue ?? 0,
    };
  } catch (error) {
    console.error('❌ Lỗi khi lấy thống kê dashboard:', error);
    throw error;
  }
};

// Chuyển trạng thái đơn hàng sang tiếng Việt
const translateStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Đang chờ xử lý',
    processing: 'Đang xử lý',
    delivered: 'Đã giao hàng',
    cancelled: 'Đã hủy',
    confirmed: 'Đã xác nhận',
  };
  return statusMap[status] || status;
};
