import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/pages/user/login.scss';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    // TODO: Gửi dữ liệu đăng ký đến server
    console.log('Thông tin đăng ký:', { fullName, email, password });
  };

  return (
    <div className="login-layout">
      {/* Sidebar danh mục */}
      <aside className="sidebar">
        <h4>📋 DANH MỤC SẢN PHẨM</h4>
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
      </aside>

      {/* Nội dung chính */}
      <div className="main-auth-content">
        <div className="top-menu">
          <span>🛡️ Chất lượng đảm bảo</span>
          <span>🚛 Vận chuyển siêu nhanh</span>
          <span>📞 Tư vấn PC</span>
          <span>✉️ Liên hệ</span>
        </div>

        <div className="auth-form-container">
          <div className="auth-tabs">
            <span><Link to="/login">Đăng nhập</Link></span>
            <span className="active">Đăng ký</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Vui lòng nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Vui lòng nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Xác nhận lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="recaptcha-note">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </div>

            <button type="submit" className="submit-button">ĐĂNG KÝ</button>

            <div className="form-footer">
              <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
