import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderDetail } from '@/api/ordersAPI';
import { formatCurrency } from '@/api/productsAPI';
import '@/styles/pages/admin/orderDetail.scss';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetchOrderDetail(id!);
      console.log("Order detail:", res); // ✅ Log dữ liệu
      setData(res);
    } catch (err) {
      console.error("Lỗi khi gọi fetchOrderDetail:", err);
    }
  };
  fetchData();
}, [id]);

  if (!data) return <div>Đang tải chi tiết đơn hàng...</div>;

  const { order, orderDetails } = data;
  const discountPercent = order.discount
    ? Math.round((order.discount / (order.total + order.discount)) * 100)
    : 0;

  return (
    <div className="order-detail-container">
      <h2>Chi tiết đơn hàng</h2>

      <div className="order-info-wrapper">
        {/* Thông tin đơn hàng */}
        <div className="order-info">
          <h3>Đơn hàng #{order._id.slice(-4)}</h3>
          <span className="status">Đã duyệt</span>
          <p><strong>📅 Ngày:</strong> {new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
          <p><strong>💰 Thanh toán:</strong> Tiền mặt</p>
        </div>

        {/* Thông tin khách hàng */}
        <div className="customer-info">
          <h3>Khách hàng</h3>
          <p><strong>👤 Tên khách hàng:</strong> {order.user_id?.name}</p>
          <p><strong>📧 Email:</strong> {order.user_id?.email}</p>
          <p><strong>📞 Điện thoại:</strong> {order.user_id?.phone}</p>
          <p><strong>📍 Địa chỉ:</strong> {order.user_id?.address}</p>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="product-list-box">
        <h3>Danh sách đơn hàng</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Mã giảm giá</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  {item.product_id?.name}
                </td>
                <td>{order.coupon_id?.code || '-'}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
            {order.discount > 0 && (
              <tr className="discount-row">
                <td colSpan={4} style={{ textAlign: 'right' }}>Giảm giá (%)</td>
                <td>{discountPercent}%</td>
              </tr>
            )}
            <tr className="total-row">
              <td colSpan={4} style={{ textAlign: 'right' }}><strong>Tổng</strong></td>
              <td><strong>{formatCurrency(order.total)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="button-wrapper">
        <button className="back-button" onClick={() => navigate(-1)}>QUAY LẠI</button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
