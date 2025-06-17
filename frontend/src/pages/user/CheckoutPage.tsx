import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import "@/styles/pages/user/checkoutPage.scss";

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="checkout-page">
      <h2>🧾 Thanh toán</h2>

      <div className="checkout-container">
        {/* Sản phẩm */}
        <div className="checkout-products">
          <h3>Sản phẩm</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="checkout-item">
              <img src={item.img_url} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>Số lượng: {item.quantity}</p>
                <p>Giá: {item.price.toLocaleString()}₫</p>
              </div>
            </div>
          ))}
          <h4>Tổng: {total.toLocaleString()}₫</h4>
        </div>

        {/* Thông tin khách hàng */}
        <div className="checkout-form">
          <h3>Thông tin người nhận</h3>
          <form>
            <input type="text" placeholder="Họ và tên" required />
            <input type="text" placeholder="Số điện thoại" required />
            <input type="text" placeholder="Địa chỉ giao hàng" required />

            <h4>Hình thức thanh toán</h4>
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              Chuyển khoản ngân hàng
            </label>

            {paymentMethod === "bank" && (
              <div className="qr-code">
                <p>Vui lòng quét mã để thanh toán:</p>
                <img src="/assets/qr-code.png" alt="QR Code thanh toán" />
              </div>
            )}

            <button type="submit">Xác nhận đơn hàng</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
