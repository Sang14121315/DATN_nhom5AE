import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const withCredentialsConfig = { withCredentials: true };

// 🧾 Tạo đơn hàng mới
export const createOrder = async (orderData: any) => {
  const res = await axios.post(`${API_URL}/orders`, orderData, withCredentialsConfig);
  return res.data;
};

// 📄 Lấy danh sách tất cả đơn hàng (cho admin)
export const getOrders = async () => {
  const res = await axios.get(`${API_URL}/orders`, withCredentialsConfig);
  return res.data.map((order: any) => ({
    ...order,
    items: (order.items || []).map((item: any) => ({
      ...item,
      img_url: item.img_url || '', // tránh lỗi thiếu ảnh
    })),
  }));
};

// 🔍 Lấy chi tiết 1 đơn hàng theo ID
export const getOrderById = async (id: string) => {
  const res = await axios.get(`${API_URL}/orders/${id}`, withCredentialsConfig);
  return res.data;
};

// 🔄 Cập nhật trạng thái đơn hàng (hủy)
export const cancelOrder = async (id: string) => {
  const res = await axios.put(`${API_URL}/orders/${id}`, { status: 'cancelled' }, withCredentialsConfig);
  return res.data;
};

// ❌ Xoá đơn hàng
export const deleteOrder = async (id: string) => {
  const res = await axios.delete(`${API_URL}/orders/${id}`, withCredentialsConfig);
  return res.data;
};

export const cancelOrderAPI = async (id: string) => {
  const res = await axios.put(`${API_URL}/orders/${id}`, { status: "cancelled" }, { withCredentials: true });
  return res.data;
};

export const deleteOrderAPI = async (id: string) => {
  const res = await axios.delete(`${API_URL}/orders/${id}`, { withCredentials: true });
  return res.data;
};
