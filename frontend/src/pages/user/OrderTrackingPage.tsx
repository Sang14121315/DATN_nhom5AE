// OrderTrackingPage.tsx
import React from "react";
import { useOrders } from "@/context/OrderContext";
import "@/styles/pages/user/orderTrackingPage.scss";

const OrderTrackingPage: React.FC = () => {
  const { orders, cancelOrder } = useOrders()

if (orders.length > 0) {
  // xử lý
}

  return (
    <div className="order-page">
      <h2>📦 Theo dõi đơn hàng</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h4>Mã đơn: {order.id}</h4>
              <div className="order-info">
                <span>Ngày: {order.date}</span>
                <span>Trạng thái: {order.status}</span>
                <span>Tổng: {order.total.toLocaleString()} ₫</span>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item._id} className="item">
                    <img src={item.img_url} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>Số lượng: {item.quantity}</p>
                      <p>Giá: {item.price.toLocaleString()} ₫</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="cancel-btn" onClick={() => cancelOrder(order.id)}>
                ❌ Huỷ đơn
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;