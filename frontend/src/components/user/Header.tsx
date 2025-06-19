import React from "react";
import "../../styles/components/user/header.scss";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Header: React.FC = () => {
  const { getTotalQuantity } = useCart();
  const totalItems = getTotalQuantity();

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/">🖥 5AE</Link>
        </div>

        {/* Search */}
        <div className="header__search">
          <input type="text" placeholder="Tìm kiếm linh kiện..." />
          <button>
            <FaSearch />
          </button>
        </div>
        {/* Auth */}
        <div className="header__auth">
          <Link to="/login" className="auth-link">
            <FaUserCircle />
          </Link>
        </div>
        {/* Actions: Cart + Auth */}
        <div className="header__actions">
          {/* Cart */}
          <Link to="/cart" className="header__cart">
            <FaShoppingCart className="icon" />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            <span></span>
          </Link>
        </div>
      </div>

      <nav className="main-nav-container">
        <div className="main-nav-wrapper">
          {/* Bên trái: menu */}
          <div className="nav-menu">
            <Link to="/" className="nav-item">
              Trang chủ
            </Link>
            <Link to="/productlist" className="nav-item">
              Sản phẩm
            </Link>
            <Link to="/contact" className="nav-item">
              Liên hệ
            </Link>
            <Link to="/introduce" className="nav-item">
              Giới thiệu
            </Link>
          </div>

          {/* Bên phải: thông tin nằm ngang */}
          <div className="nav-right-info">
            <span className="info-item">Chất lượng đảm bảo</span>
            <span className="info-item">Vận chuyển siêu tốc</span>
            <span className="info-item">Tư vấn liên hệ: 0123456789</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
