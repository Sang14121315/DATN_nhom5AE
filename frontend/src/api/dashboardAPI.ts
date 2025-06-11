import axios from 'axios';

export interface DashboardStats {
  totalOrders: number;
  totalDelivered: number;
  totalCanceled: number;
  totalRevenue: number;
}

export interface DashboardOrder {
  _id: string;
  product: string;
  orderNumber: string;
  date: string;
  customer: string;
  status: string;
  amount: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const token = localStorage.getItem('token'); // Giả định token được lưu trong localStorage
  const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchRecentOrders = async (): Promise<DashboardOrder[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/api/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.orders;
};

export const formatCurrency = (value: number): string => {
  return `${value.toLocaleString()} VNĐ`;
};