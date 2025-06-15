import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/pages/user/login.scss';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Gọi API đăng nhập tại đây
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-layout">
      {/* Sidebar Danh mục sản phẩm */}
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

      {/* Main Login Content */}
      <div className="main-auth-content">
        <div className="top-menu">
          <span>🛡️ Chất lượng đảm bảo</span>
          <span>🚛 Vận chuyển siêu nhanh</span>
          <span>📞 Tư vấn PC</span>
          <span>✉️ Liên hệ</span>
        </div>

        <div className="auth-form-container">
          <div className="auth-tabs">
            <span className="active">Đăng nhập</span>
            <span><Link to="/register">Đăng ký</Link></span>
          </div>

          <form onSubmit={handleLogin}>
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

            <div className="recaptcha-note">
              Trang này được bảo vệ bởi reCAPTCHA và tuân theo Chính sách quyền riêng tư cùng Điều khoản dịch vụ của Google.
            </div>

            <button type="submit" className="submit-button">ĐĂNG NHẬP</button>
          </form>

          <div className="form-footer">
            <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            <p>Bạn quên mật khẩu? <Link to="/forgot-password">Quên mật khẩu</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
