import "@/styles/pages/user/forgotPassword.scss";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
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
              <span className="active">Quên mật khẩu</span>
            </div>

            <form className="forgot-password-form">
              <div className="email-group">
                <input type="email" placeholder="Vui lòng nhập email của bạn" />
                <button type="button" className="btn-send">Gửi mã</button>
              </div>

              <input type="password" placeholder="Vui lòng nhập mật khẩu mới" />
              <input type="password" placeholder="Vui lòng xác nhận mật khẩu" />

              <button type="submit" className="submit-button">XÁC NHẬN</button>

              <div className="auth-links">
                <span>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></span>
                <span>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
