import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '@/styles/pages/user/register.scss';
import { loginUser } from '@/api/user/userAPI';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });

      // ✅ Không cần lưu token nếu backend đã set cookie
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));

      if (res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Đăng nhập thất bại!');
    }
  };

  return (
    <div className="register-layout">
      {/* Banner trái */}
      <Link to="/product/684b0b700a18dcee50370f35" className="side-banner-link">
        <div className="side-banner">
          <img src="/assets/banner-left.png" alt="Banner trái" />
        </div>
      </Link>

      {/* Nội dung chính */}
      <div className="main-auth-content">
        <div className="top-menu">
          <span>🛡️ Chất lượng đảm bảo</span>
          <span>🚛 Vận chuyển siêu nhanh</span>
          <span>📞 Tư vấn PC</span>
          <span>✉️ Liên hệ</span>
        </div>

        <form className="auth-form-container" onSubmit={handleLogin}>
          <div className="auth-tabs">
            <span className={location.pathname === '/login' ? 'active' : ''}>
              <Link to="/login">Đăng nhập</Link>
            </span>
            <span className={location.pathname === '/register' ? 'active' : ''}>
              <Link to="/register">Đăng ký</Link>
            </span>
          </div>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <input
            type="email"
            placeholder="Vui lòng nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="form-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Vui lòng nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="recaptcha-note">
            Trang này được bảo vệ bởi reCAPTCHA và tuân theo Chính sách quyền riêng tư cùng Điều khoản dịch vụ của Google.
          </div>

          <button type="submit">ĐĂNG NHẬP</button>

          <div className="form-footer">
            <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
            <p>Bạn quên mật khẩu? <Link to="/forgot-password">Quên mật khẩu</Link></p>
          </div>
        </form>
      </div>

      {/* Banner phải */}
      <Link to="/product/684b0b700a18dcee50370f3f" className="side-banner-link">
        <div className="side-banner">
          <img src="/assets/banner-right.png" alt="Banner phải" />
        </div>
      </Link>
    </div>
  );
};

export default LoginPage;
