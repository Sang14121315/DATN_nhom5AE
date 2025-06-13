import { Link } from "react-router-dom";
import "@/styles/pages/user/login.scss";

const RegisterPage = () => {
  return (
    <>
      <div className="login-layout">
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
            <li>  PC GIẢ LẬP - ẢO HÓA</li>
            <li>PC MINI</li>
            <li>PC Refurbished</li>
          </ul>
        </aside>

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

            <div className="form-group">
              <input type="text" placeholder="Vui lòng nhập họ và tên" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Vui lòng nhập email của bạn" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Vui lòng nhập mật khẩu" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Xác nhận lại mật khẩu" />
            </div>

            <div className="recaptcha-note">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </div>

            <button className="submit-button">ĐĂNG KÝ</button>

            <div className="form-footer">
              <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
