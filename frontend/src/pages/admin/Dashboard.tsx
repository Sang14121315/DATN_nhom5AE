import React, { useEffect, useState } from 'react';
import { fetchDashboardStats, fetchRecentOrders, DashboardStats, DashboardOrder, formatCurrency } from '../../api/dashboardAPI';
import '@/styles/pages/admin/dashboard.scss';
import { FaShoppingCart, FaCheckCircle, FaTimesCircle, FaMoneyBillWave } from 'react-icons/fa';

const DashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [statsData, ordersData] = await Promise.all([
          fetchDashboardStats(),
          fetchRecentOrders(),
        ]);
        setStats(statsData);
        setOrders(ordersData);
      } catch (err) {
        setError('Không thể tải dữ liệu dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
      'Đã giao hàng': '#4CAF50',
      'Đã hủy': '#F44336',
      'Đang xử lý': '#FFC107',
    };
    return statusColors[status] || '#9E9E9E';
  };

  if (loading) return <div className="dashboard-loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      
      <div className="stats-boxes">
        <div className="stat-box">
          <div className="icon"><FaShoppingCart size={24} /></div>
          <div className="stat-value">{stats?.totalOrders ?? 0}</div>
          <div className="stat-label">Tổng đơn hàng</div>
        </div>
        
        <div className="stat-box">
          <div className="icon"><FaCheckCircle size={24} /></div>
          <div className="stat-value">{stats?.totalDelivered ?? 0}</div>
          <div className="stat-label">Đã giao hàng</div>
        </div>
        
        <div className="stat-box">
          <div className="icon"><FaTimesCircle size={24} /></div>
          <div className="stat-value">{stats?.totalCanceled ?? 0}</div>
          <div className="stat-label">Đã hủy</div>
        </div>
        
        <div className="stat-box">
          <div className="icon"><FaMoneyBillWave size={24} /></div>
          <div className="stat-value">{formatCurrency(stats?.totalRevenue ?? 0)}</div>
          <div className="stat-label">Tổng doanh thu</div>
        </div>
      </div>

      <h2>Đơn Hàng Gần Đây</h2>
      
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>Mã đơn</th>
              <th>Ngày</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6)}</td>
                  <td>{order.product}</td>
                  <td>{order.orderNumber}</td>
                  <td>{formatDate(order.date)}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span 
                      className="status-label" 
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{formatCurrency(order.amount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>Không có đơn hàng</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;