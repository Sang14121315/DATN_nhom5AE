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

      <div className="checkout-grid">
        {/* Thông tin khách hàng */}
        <div className="checkout-section customer-info">
          <h3>Thông tin khách hàng</h3>
          <form>
            <input type="text" placeholder="Họ và tên *" required />
            <input type="tel" placeholder="Điện thoại *" required />
            <input type="email" placeholder="Email" />
            <select required>
              <option value="">Tỉnh / Thành phố *</option>
              <option>TP.HCM</option>
              <option>Hà Nội</option>
              <option>Đà Nẵng</option>
            </select>
            <select required>
              <option value="">Quận / Huyện *</option>
              <option>Quận 1</option>
              <option>Quận 2</option>
              <option>...</option>
            </select>
            <select required>
              <option value="">Phường / Xã *</option>
              <option>Phường A</option>
              <option>Phường B</option>
            </select>
            <input type="text" placeholder="Địa chỉ *" required />
          </form>
        </div>

        {/* Hình thức thanh toán */}
        <div className="checkout-section payment-methods">
          <h3>Hình thức thanh toán</h3>

          <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>💵 Thanh toán khi nhận hàng / Chuyển phát nhanh - COD</span>
          </label>

          <label className={`payment-option ${paymentMethod === "store" ? "selected" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="store"
              checked={paymentMethod === "store"}
              onChange={() => setPaymentMethod("store")}
            />
            <span>🏪 Thanh toán tại cửa hàng</span>
          </label>

          <label className={`payment-option ${paymentMethod === "bank" ? "selected" : ""}`}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => setPaymentMethod("bank")}
            />
            <span>🏦 Chuyển khoản qua ngân hàng</span>
          </label>

          {paymentMethod === "bank" && (
            <div className="qr-container">
              <p>Vui lòng quét mã để thanh toán:</p>
              <img
                src={`https://img.vietqr.io/image/tpbank-25520122005-pr_only.png?amount=${total}&addInfo=5AE&accountName=HUYNHTHANHSANG`}
                alt="QR chuyển khoản"
                className="qr-image"
              />
            </div>
          )}
        </div>

        {/* Thông tin đơn hàng */}
        <div className="checkout-section order-summary">
          <h3>Thông tin đơn hàng</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="order-item">
              <img src={item.img_url} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>Số Lượng: {item.quantity}</p>
                <p>Giá: {item.price.toLocaleString()} ₫</p>
              </div>
            </div>
          ))}
          <div className="summary-row">Tổng đơn hàng: {total.toLocaleString()} ₫</div>
          <div className="summary-row">Chiết khấu: 0</div>
          <div className="summary-row">Phí vận chuyển: 0</div>
          <div className="summary-row total">Tổng tiền: {total.toLocaleString()} ₫</div>

          <div className="discount-code">
            <input type="text" placeholder="Mã giảm giá" />
            <button className="apply-btn">Sử dụng</button>
          </div>

          <textarea placeholder="Ghi chú"></textarea>

          <div className="action-buttons">
            <button className="continue-btn">Tiếp tục mua hàng</button>
            <button className="confirm-btn">Xác nhận & Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;