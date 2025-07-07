// AdminOrderPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders, updateOrderStatus } from '@/api/orderAPI';
import '@/styles/pages/admin/orderList.scss';
import { FaEye } from "react-icons/fa";

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
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    totalFrom: '',
    totalTo: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ search: '', status: '', dateFrom: '', dateTo: '', totalFrom: '', totalTo: '' });
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Cập nhật trạng thái thất bại!');
    }
  };

  const filteredOrders = orders.filter(order => {
    // Search by customer name or phone
    const searchMatch =
      filters.search === '' ||
      order.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.customer.phone.includes(filters.search);
    // Status
    const statusMatch = !filters.status || order.status === filters.status;
    // Date range
    const orderDate = new Date(order.created_at);
    const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const toDate = filters.dateTo ? new Date(filters.dateTo) : null;
    const dateMatch =
      (!fromDate || orderDate >= fromDate) &&
      (!toDate || orderDate <= toDate);
    // Total range
    const totalFrom = filters.totalFrom ? parseInt(filters.totalFrom) : null;
    const totalTo = filters.totalTo ? parseInt(filters.totalTo) : null;
    const totalMatch =
      (!totalFrom || order.total >= totalFrom) &&
      (!totalTo || order.total <= totalTo);
    return searchMatch && statusMatch && dateMatch && totalMatch;
  });

  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

  return (
    <div className="admin-orders">
      <h2>📦 Quản lý đơn hàng</h2>
      {/* Bộ lọc */}
      <form className="order-filter-form" onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Tìm tên hoặc SĐT khách hàng"
        />
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Hoàn thành</option>
          <option value="canceled">Đã hủy</option>
        </select>
        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleFilterChange}
          placeholder="Từ ngày"
        />
        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleFilterChange}
          placeholder="Đến ngày"
        />
        <input
          type="number"
          name="totalFrom"
          value={filters.totalFrom}
          onChange={handleFilterChange}
          placeholder="Tổng từ (₫)"
          min="0"
        />
        <input
          type="number"
          name="totalTo"
          value={filters.totalTo}
          onChange={handleFilterChange}
          placeholder="Tổng đến (₫)"
          min="0"
        />
        <select value={ordersPerPage} onChange={e => { setOrdersPerPage(Number(e.target.value)); setCurrentPage(1); }} style={{marginLeft: 12}}>
          <option value={5}>5 / trang</option>
          <option value={10}>10 / trang</option>
          <option value={20}>20 / trang</option>
          <option value={50}>50 / trang</option>
          <option value={100}>100 / trang</option>
        </select>
        <button type="button" onClick={handleClearFilters} className="clear-filter-btn">Xóa lọc</button>
      </form>
      {/* Danh sách đơn hàng */}
      {loading ? (
        <p>Đang tải đơn hàng...</p>
      ) : (
        <>
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
              {paginatedOrders.map((order, index) => (
                <tr key={order._id}>
                  <td>{(currentPage - 1) * ordersPerPage + index + 1}</td>
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
                  <td>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                      className={`status-label ${order.status}`}
                      style={{ minWidth: 110 }}
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="shipping">Đang giao</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="canceled">Đã hủy</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/admin/orders/${order._id}`)} className="view-btn">
                      <FaEye /> Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-table-summary">
            Showing {(currentPage - 1) * ordersPerPage + 1}
            -{Math.min(currentPage * ordersPerPage, totalOrders)} from {totalOrders}
          </div>
          <div className="pagination-controls pagination-right">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>{'<'}</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), currentPage + 2).map(page => (
              <button
                key={page}
                className={`page-number${page === currentPage ? ' active' : ''}`}
                onClick={() => setCurrentPage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages - 2 && <span>...</span>}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>{'>'}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrderPage;
