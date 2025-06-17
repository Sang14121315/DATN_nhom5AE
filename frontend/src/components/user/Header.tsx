import React from 'react';
import '../../styles/components/user/header.scss';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
  const { getTotalQuantity } = useCart();
  const totalItems = getTotalQuantity();

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <div className="header__logo">
          <Link to="/">🖥 5AnhEmPC</Link>
        </div>

        {/* Search */}
        <div className="header__search">
          <input type="text" placeholder="Tìm kiếm linh kiện..." />
          <button><FaSearch /></button>
        </div>
{/* Auth */}
          <div className="header__auth">
            <Link to="/login" className="auth-link">
              <FaUserCircle /> Đăng nhập
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
    </header>
  );
};

export default Header;
