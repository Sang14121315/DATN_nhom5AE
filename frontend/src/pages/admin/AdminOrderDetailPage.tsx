import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, deleteOrderAPI } from "@/api/orderAPI";
import "@/styles/pages/admin/orderDetail.scss";

const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id!);
        console.log("🛠️ Order fetched:", data);
        setOrderData(data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Bạn có chắc muốn xoá đơn hàng này không?");
    if (!confirm) return;

    try {
      await deleteOrderAPI(id!);
      alert("Đã xoá đơn hàng thành công");
      navigate("/admin/order");
    } catch (error) {
      console.error("❌ Xoá đơn thất bại:", error);
      alert("Không thể xoá đơn hàng");
    }
  };

  const formatMoney = (value: number | undefined | null) => {
    if (typeof value !== "number" || isNaN(value)) return "0₫";
    return value.toLocaleString("vi-VN") + "₫";
  };

  if (loading) return <p>Đang tải chi tiết đơn hàng...</p>;
  if (!orderData) return <p>Không tìm thấy đơn hàng</p>;

  const {
    _id,
    customer,
    items,
    payment_method,
    total,
    status,
    created_at
  } = orderData;

  return (
    <div className="admin-order-detail">
      <h2>📦 Chi tiết đơn hàng #{_id}</h2>

      <section className="order-section">
        <h3>👤 Khách hàng</h3>
        <p><strong>Họ tên:</strong> {customer?.name || "(Không có tên)"}</p>
        <p><strong>SĐT:</strong> {customer?.phone || "(Không có số)"}</p>
        <p><strong>Email:</strong> {customer?.email || "(Không có email)"}</p>
        <p><strong>Địa chỉ:</strong> {customer?.address || "(Không có địa chỉ)"}</p>
      </section>

      <section className="order-section">
        <h3>🛒 Sản phẩm</h3>
        {items?.length > 0 ? (
          items.map((item: any, idx: number) => (
            <div key={idx} className="product-row">
              <img
                src={item.img_url || "/no-image.png"}
                alt={item.name}
                onError={(e) => (e.currentTarget.src = "/no-image.png")}
              />
              <div>
                <p><strong>{item.name}</strong></p>
                <p>Số lượng: {item.quantity}</p>
                <p>Giá: {formatMoney(item.price)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm nào</p>
        )}
      </section>

      <section className="order-section">
        <h3>💳 Thanh toán</h3>
        <p><strong>Hình thức:</strong> {payment_method === 'cod' ? "COD - khi nhận hàng" : "Chuyển khoản ngân hàng"}</p>
        <p><strong>Tổng tiền:</strong> {formatMoney(total)}</p>
        <p><strong>Trạng thái:</strong> <span className={`status-label ${status}`}>{status}</span></p>
      </section>

      <div className="action-buttons">
        <button className="back-btn" onClick={() => navigate("/admin/order")}>Quay lại</button>
        <button className="delete-btn" onClick={handleDelete}>🗑 Xoá đơn hàng</button>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
