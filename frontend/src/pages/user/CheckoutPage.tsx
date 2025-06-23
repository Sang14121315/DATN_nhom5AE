// CheckoutPage.tsx
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import { getProvinces, getDistrictsByProvinceCode, getWardsByDistrictCode } from "vn-provinces";
import "@/styles/pages/user/checkoutPage.scss";

const CheckoutPage: React.FC = () => {
  const { cartItems } = useCart();
  const { addOrder } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    ward: "",
    address: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    phone: false,
    city: false,
    district: false,
    ward: false,
    address: false,
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    setProvinces(getProvinces());
  }, []);

  useEffect(() => {
    const selectedProvince = provinces.find(p => p.name === formData.city);
    setDistricts(selectedProvince ? getDistrictsByProvinceCode(selectedProvince.code) : []);
    setFormData(prev => ({ ...prev, district: "", ward: "" }));
  }, [formData.city]);

  useEffect(() => {
    const selectedDistrict = districts.find(d => d.name === formData.district);
    setWards(selectedDistrict ? getWardsByDistrictCode(selectedDistrict.code) : []);
    setFormData(prev => ({ ...prev, ward: "" }));
  }, [formData.district]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      phone: !formData.phone.trim(),
      city: !formData.city,
      district: !formData.district,
      ward: !formData.ward,
      address: !formData.address.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newOrder = {
        id: `DH${Date.now()}`,
        date: new Date().toLocaleDateString("vi-VN"),
        status: "Đã xác nhận",
        total,
        items: cartItems,
      };
      addOrder(newOrder);
      setShowSuccess(true);
      setShowError(false);
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>🧾 Thanh toán</h2>
      <div className="checkout-grid">
        <div className="checkout-section customer-info">
          <h3>Thông tin khách hàng</h3>
          <form>
            <input name="name" placeholder="Họ và tên *" value={formData.name} onChange={handleChange} />
            {formErrors.name && <p className="error">Phải nhập họ và tên</p>}

            <input name="phone" placeholder="Điện thoại *" value={formData.phone} onChange={handleChange} />
            {formErrors.phone && <p className="error">Phải nhập số điện thoại</p>}

            <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Tỉnh / Thành phố *</option>
              {provinces.map((pv) => (
                <option key={pv.code} value={pv.name}>{pv.name}</option>
              ))}
            </select>
            {formErrors.city && <p className="error">Phải chọn tỉnh / thành phố</p>}

            <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.city}>
              <option value="">Quận / Huyện *</option>
              {districts.map((dt) => (
                <option key={dt.code} value={dt.name}>{dt.name}</option>
              ))}
            </select>
            {formErrors.district && <p className="error">Phải chọn quận / huyện</p>}

            <select name="ward" value={formData.ward} onChange={handleChange} disabled={!formData.district}>
              <option value="">Phường / Xã *</option>
              {wards.map((wd) => (
                <option key={wd.code} value={wd.name}>{wd.name}</option>
              ))}
            </select>
            {formErrors.ward && <p className="error">Phải chọn phường / xã</p>}

            <input name="address" placeholder="Địa chỉ *" value={formData.address} onChange={handleChange} />
            {formErrors.address && <p className="error">Phải nhập địa chỉ</p>}
          </form>
        </div>

        <div className="checkout-section payment-methods">
          <h3>Hình thức thanh toán</h3>
          <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
            <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
            <span>💵 Thanh toán khi nhận hàng / Chuyển phát nhanh - COD</span>
          </label>

          <label className={`payment-option ${paymentMethod === "bank" ? "selected" : ""}`}>
            <input type="radio" name="payment" value="bank" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />
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
            <button className="continue-btn" onClick={() => window.location.href = "/"}>Tiếp tục mua hàng</button>
            <button className="confirm-btn" onClick={handleSubmit}>Xác nhận & Đặt hàng</button>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="order-success-popup">
          <div className="popup-content">
            <h3> Đặt hàng thành công!</h3>
            <p>Cảm ơn bạn đã mua hàng.</p>
            <button onClick={() => window.location.href = "/"}>Xem Thêm </button>
            <button onClick={() => window.location.href = "/orders"}>Theo dõi đơn hàng</button>
            <span className="close-btn" onClick={() => setShowSuccess(false)}>×</span>
          </div>
        </div>
      )}

      {showError && (
        <div className="order-success-popup">
          <div className="popup-content">
            <h3 style={{ color: "#dc3545" }}>❌ Đặt hàng thất bại</h3>
            <p>Vui lòng kiểm tra lại thông tin bạn đã nhập.</p>
            <button onClick={() => setShowError(false)}>Thử lại</button>
            <span className="close-btn" onClick={() => setShowError(false)}>×</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;