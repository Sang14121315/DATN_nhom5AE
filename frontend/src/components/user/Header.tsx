import React, { useState } from "react";
import "../../styles/components/user/header.scss";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CartSidebar from "@/components/user/CartSidebar"; // ⬅ đảm bảo import đúng

const Header: React.FC = () => {
  const { totalQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false); // ⬅ trạng thái mở/đóng sidebar

  return (
    <>
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

          {/* Actions: Cart */}
          <div className="header__actions">
            <button className="header__cart" onClick={() => setIsOpen(true)}>
              <FaShoppingCart className="icon" />
              {totalQuantity > 0 && (
                <span className="cart-count">{totalQuantity}</span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="main-nav-container">
          <div className="main-nav-wrapper">
            {/* Menu trái */}
            <div className="nav-menu">
              <Link to="/" className="nav-item">Trang chủ</Link>
              <Link to="/productlist" className="nav-item">Sản phẩm</Link>
              <Link to="/contact" className="nav-item">Liên hệ</Link>
              <Link to="/introduce" className="nav-item">Giới thiệu</Link>
            </div>

            {/* Thông tin phải */}
            <div className="nav-right-info">
              <span className="info-item">Chất lượng đảm bảo</span>
              <span className="info-item">Vận chuyển siêu tốc</span>
              <span className="info-item">Tư vấn liên hệ: 0123456789</span>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar hiển thị giỏ hàng */}
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
