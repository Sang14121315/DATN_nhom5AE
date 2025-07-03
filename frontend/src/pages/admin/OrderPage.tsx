// AdminOrderPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '@/api/orderAPI';
import '@/styles/pages/admin/orderList.scss';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  customer: {
    name: string;
    phone: string;
  };
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const AdminOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
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
      <h2>📦 Quản lý đơn hàng</h2>

      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Sản phẩm</th>
              <th>Ngày đặt</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>
                  {order.items?.slice(0, 2).map((item, idx) => (
                    <div key={idx}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                  {order.items.length > 2 && <div>...và {order.items.length - 2} sản phẩm khác</div>}
                </td>
                <td>{new Date(order.created_at).toLocaleDateString('vi-VN')}</td>
                <td>{order.customer.name}</td>
                <td>{order.total.toLocaleString()}₫</td>
                <td><span className={`status-label ${order.status}`}>{order.status}</span></td>
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
