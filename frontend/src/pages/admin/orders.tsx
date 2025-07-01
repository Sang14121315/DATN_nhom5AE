import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllOrders, Order } from '@/api/ordersAPI';
import '@/styles/pages/admin/orders.scss';
import { formatCurrency } from '@/api/productsAPI';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchAllOrders({ search, status: statusFilter, page });
        setOrders(data); // ✅ Vì fetchAllOrders trả về Order[]
      } catch (err) {
        console.error('Lỗi khi tải đơn hàng:', err);
      }
    };
    loadOrders();
  }, [search, statusFilter, page]);

  return (
    <div className="admin-orders">
      <h2>Đơn hàng</h2>

      <div className="filters">
        <button>📅 Ngày</button>
        <button>Trạng thái </button>
        <input
          type="text"
          placeholder="🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="orders-table">
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
              <td>#{index + 1 + (page - 1) * 10}</td>
              <td>
                <div className="product-info">
                  <img src={order.orderDetails?.[0]?.product_id?.img_url || '/default.png'} />
                  <div>
                    {order.orderDetails?.[0]?.product_id?.name}
                    <br />
                    <span>+{(order.orderDetails?.length || 1) - 1} sản phẩm</span>
                  </div>
                </div>
              </td>
              <td>{new Date(order.created_at || '').toLocaleDateString()}</td>
              <td>{order.user_id?.name}</td>
              <td>{formatCurrency(order.total)}</td>
              <td>
                <span className={`status ${order.status}`}>Đã duyệt</span>
              </td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
                >
                  👁️ Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[1, 2, 3, 4, 5].map((p) => (
          <button
            key={p}
            className={p === page ? 'active' : ''}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <span>...</span>
        <button onClick={() => setPage(page + 1)}>{page + 1}</button>
      </div>
    </div>
  );
};

export default OrdersPage;
