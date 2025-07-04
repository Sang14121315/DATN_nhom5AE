import React from "react";
import { useOrders } from "@/context/OrderContext";
import "@/styles/pages/user/orderTrackingPage.scss";

const OrderTrackingPage: React.FC = () => {
  const { orders, cancelOrder } = useOrders();

  const handleCancel = (id: string) => {
    const confirm = window.confirm("Bạn có chắc muốn huỷ đơn hàng này?");
    if (confirm) cancelOrder(id);
  };

  if (!orders || !Array.isArray(orders)) {
    return (
      <div className="order-page">
        <h2>📦 Theo dõi đơn hàng</h2>
        <p style={{ textAlign: "center", color: "#777" }}>Đang tải đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h2>📦 Theo dõi đơn hàng</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Bạn chưa có đơn hàng nào.
        </p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <h4>
                🧾 Mã đơn: <span style={{ color: "#555" }}>{order._id}</span>
              </h4>
              <div className="order-info">
                <span>👤 Khách: {order.customer?.name || "Không rõ"}</span>
                <span>📅 Ngày: {new Date(order.created_at).toLocaleDateString("vi-VN")}</span>
                <span>🚚 Trạng thái: <strong>{translateStatus(order.status)}</strong></span>
                <span>💰 Tổng: {order.total.toLocaleString()} ₫</span>
              </div>

              <div className="order-items">
                {(order.items || []).map((item, index) => {
                  const productId = typeof item.product_id === "string" ? item.product_id : `item-${index}`;
                  const key = `${order._id}-${productId}-${index}`;

                  const imgSrc = item.img_url && item.img_url !== ""
                    ? item.img_url
                    : "/images/placeholder.png";

                  const altText = typeof item.name === "string" ? item.name : "Sản phẩm";

                  return (
                    <div key={key} className="item">
                      <img src={imgSrc} alt={altText} className="product-image" />
                      <div>
                        <p>{altText}</p>
                        <p>Số lượng: {item.quantity}</p>
                        <p>Giá: {item.price.toLocaleString()} ₫</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {order.status === "pending" && (
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(order._id)}
                >
                  ❌ Huỷ đơn
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const translateStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: "Đang chờ xử lý",
    processing: "Đang xử lý",
    delivered: "Đã giao hàng",
    cancelled: "Đã hủy",
    confirmed: "Đã xác nhận",
  };
  return statusMap[status] || status;
};

export default OrderTrackingPage;
