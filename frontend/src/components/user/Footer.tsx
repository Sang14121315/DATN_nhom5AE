import React from 'react';
import '../../styles/components/user/footer.scss';
import { FaFacebookF, FaTiktok, FaTelegramPlane, FaCircle } from 'react-icons/fa';
import { MdLocationOn, MdEmail } from 'react-icons/md';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">

        {/* Về AnhBayCO */}
        <div className="footer__col">
          <h4>Về 5 Anh Em</h4>
          <p>Chuyên bán linh kiện điện tử uy tín, nhanh chóng. Luôn tìm kiếm những sản phẩm vì game thủ.</p>
          <div className="footer__social">
            <FaFacebookF />
            <FaTiktok />
            <FaTelegramPlane />
            <FaCircle />
          </div>
        </div>

        {/* Thông tin liên hệ */}
        <div className="footer__col">
          <h4>Thông tin liên hệ</h4>
          <p><MdLocationOn /> Quận 12, QL1A, Tân Thới Hiệp, tp.HCM</p>
          <p><MdEmail /> anhbayco@gmail.com</p>
        </div>

        {/* Tài Khoản Ngân Hàng */}
        <div className="footer__col">
          <h4>Tài Khoản Ngân Hàng</h4>
          <ul>
            <li>Tài khoản ngân hàng</li>
            <li>Tìm kiếm</li>
            <li>Phương thức thanh toán</li>
          </ul>
        </div>

        {/* Chính sách */}
        <div className="footer__col">
          <h4>Chính sách</h4>
          <ul>
            <li>Chính sách bảo mật</li>
            <li>Qui định bảo hành</li>
            <li>Chính sách đổi trả</li>
            <li>Điều khoản sử dụng</li>
            <li>Chính sách vận chuyển & kiểm hàng</li>
            <li>Phân định trách nhiệm của dịch vụ cung ứng</li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        © 2025 5 Anh Em – Chuyên bán linh kiện điện tử uy tín, nhanh chóng.
      </div>
    </footer>
  );
};

export default Footer;