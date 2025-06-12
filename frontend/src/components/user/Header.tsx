import React from 'react';
import '../../styles/components/user/header.scss';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__logo">LOGO</div>

      <div className="header__search">
        <input type="text" placeholder="Tìm kiếm linh kiện..." />
        <button><FaSearch /></button>
      </div>

      <div className="header__actions">
        <div className="header__account">
          <FaUserCircle className="icon" />
          <div className="text">
            <span>Đăng ký/ Đăng nhập</span>
            <span>Tài khoản của tôi</span>
          </div>
        </div>

        <div className="header__cart">
          <FaShoppingCart className="icon" />
          <span>Giỏ hàng</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
