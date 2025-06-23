import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/pages/user/forgotPassword.scss';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendCode = async () => {
    if (!validateEmail(email)) {
      setMessage('❌ Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }

    try {
      setSending(true);
      setMessage(null);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Giả lập gửi email
      setMessage('✅ Mã xác thực đã được gửi đến email của bạn.');
      setShowOtpInput(true);
    } catch (error) {
      setMessage('❌ Đã xảy ra lỗi khi gửi mã. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setMessage('❌ Vui lòng nhập mã xác thực.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('❌ Mật khẩu xác nhận không khớp.');
      return;
    }

    // TODO: Gọi API đặt lại mật khẩu ở đây
    setMessage('✅ Mật khẩu của bạn đã được đặt lại thành công!');
  };

  return (
    <div className="register-layout">
      {/* Banner trái */}
      <div className="side-banner">
        <img src="/assets/banner-left.png" alt="Banner trái" />
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <h4>📋 DANH MỤC SẢN PHẨM</h4>
        <div className="dropdown">
          <ul>
            <li>PC Gaming - Máy tính chơi game</li>
            <li>PC Workstation</li>
            <li>Tự Build Cấu Hình PC</li>
            <li>PC VĂN PHÒNG</li>
            <li>PC AMD GAMING</li>
            <li>PC Core Ultra</li>
            <li>PC GAMING ĐẸP – CAO CẤP</li>
            <li>PC GIẢ LẬP - ẢO HÓA</li>
            <li>PC MINI</li>
            <li>PC Refurbished</li>
          </ul>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="main-auth-content">
        <div className="top-menu">
          <span>🛡️ Chất lượng đảm bảo</span>
          <span>🚛 Vận chuyển siêu nhanh</span>
          <span>📞 Tư vấn PC</span>
          <span>✉️ Liên hệ</span>
        </div>

        <form className="auth-form-container" onSubmit={handleSubmit}>
          <div className="auth-tabs">
            <span><Link to="/login">Đăng nhập</Link></span>
            <span className="active">Quên mật khẩu</span>
          </div>

          {message && <p className="error-message">{message}</p>}

          <div className="form-group with-button">
            <input
              type="email"
              placeholder="Vui lòng nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn-send"
              onClick={handleSendCode}
              disabled={sending}
            >
              {sending ? 'Đang gửi...' : 'Gửi mã'}
            </button>
          </div>

          {showOtpInput && (
            <>
              <input
                type="text"
                placeholder="Nhập mã xác thực"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <div className="form-group password-group">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Vui lòng nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? 'ẩn' : 'hiện'}
                </button>
              </div>

              <div className="form-group password-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Xác nhận lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? 'ẩn' : 'hiện'}
                </button>
              </div>
            </>
          )}

          <div className="recaptcha-note">
            Trang này được bảo vệ bởi reCAPTCHA và tuân theo Chính sách quyền riêng tư cùng Điều khoản dịch vụ của Google.
          </div>

          <button type="submit">XÁC NHẬN</button>

          <div className="form-footer">
            <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
          </div>
        </form>
      </div>

      {/* Banner phải */}
      <div className="side-banner">
        <img src="/assets/banner-right.png" alt="Banner phải" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
