// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // Kiểu dữ liệu đã chuẩn hóa sau khi xử lý API
// export interface Order {
//   _id: string;
//   product: string;
//   orderNumber: string;
//   date: string;
//   customer: string;
//   status: string;
//   amount: number;
// }

// // Kiểu dữ liệu cho thống kê dashboard
// export interface DashboardStats {
//   totalOrders: number;
//   totalDelivered: number;
//   totalCanceled: number;
//   totalRevenue: number;
// }

// // Kiểu dữ liệu thô trả về từ API
// interface RawOrder {
//   _id: string;
//   product?: string;
//   name?: string;
//   orderNumber?: string;
//   code?: string;
//   createdAt?: string;
//   date?: string;
//   customer: string;
//   status: string;
//   amount?: number;
//   value?: number;
// }

// // API: Lấy danh sách đơn hàng gần đây
// export const getRecentOrders = async (): Promise<Order[]> => {
//   try {
//     const response = await axios.get(`${API_URL}/orders/recent`);
//     const rawOrders: RawOrder[] = response.data.orders;

//     return rawOrders.map((order): Order => ({
//       _id: order._id,
//       product: order.product || order.name || 'Không rõ sản phẩm',
//       orderNumber: order.orderNumber || order.code || 'Mã đơn không rõ',
//       date: order.createdAt || order.date || new Date().toISOString(),
//       customer: order.customer,
//       status: translateStatus(order.status),
//       amount: order.amount ?? order.value ?? 0
//     }));
//   } catch (error) {
//     console.error('Error fetching recent orders:', error);
//     throw error;
//   }
// };

// // API: Lấy thống kê tổng quan dashboard
// export const getDashboardStats = async (): Promise<DashboardStats> => {
//   try {
//     const response = await axios.get(`${API_URL}/orders/stats`);
//     return {
//       totalOrders: response.data.totalOrders || 0,
//       totalDelivered: response.data.totalDelivered || 0,
//       totalCanceled: response.data.totalCanceled || 0,
//       totalRevenue: response.data.totalRevenue || 0
//     };
//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//     throw error;
//   }
// };

// // Hàm chuyển trạng thái từ tiếng Anh sang tiếng Việt
// const translateStatus = (status: string): string => {
//   const statusMap: Record<string, string> = {
//     'pending': 'Đang xử lý',
//     'processing': 'Đang xử lý',
//     'delivered': 'Đã giao hàng',
//     'canceled': 'Đã hủy',
//     'Đã đặt': 'Đã đặt',
//     'Đã hủy': 'Đã hủy'
//   };
//   return statusMap[status] || status;
// };
