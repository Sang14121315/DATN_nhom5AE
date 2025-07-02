// AdminOrderPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecentOrders, Order } from '@/api/orderAPI';
import '@/styles/pages/admin/orderList.scss';

const AdminOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getRecentOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>Đơn hàng</h2>

      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>Ngày</th>
              <th>Khách hàng</th>
              <th>Giá</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>#{index + 1}</td>
                <td>{order.product}</td>
                <td>{new Date(order.date).toLocaleDateString('vi-VN')}</td>
                <td>{order.customer}</td>
                <td>{order.amount.toLocaleString()}₫</td>
                <td><span className="status-label">{order.status}</span></td>
                <td>
                  <button onClick={() => navigate(`/admin/orders/${order._id}`)} className="view-btn">Xem</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderPage;
