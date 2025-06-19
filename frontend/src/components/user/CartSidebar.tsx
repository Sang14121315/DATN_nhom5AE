import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import '@/styles/components/user/cartSidebar.scss';
import { Link } from "react-router-dom";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>GIỎ HÀNG CỦA TÔI ({cartItems.length})</h3>
        <button onClick={onClose}><FaTimes /></button>
      </div>
      <div className="cart-content">
        {cartItems.map(item => (
          <div className="cart-item" key={item._id}>
            <img src={item.img_url} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>{item.price.toLocaleString()} đ</p>
              <p>Số lượng: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <p>Tổng tiền: {totalPrice.toLocaleString()} đ</p>
        <Link to="/cart" className="checkout-btn">Chi Tiết</Link>
        <Link to="/checkout" className="checkout-btn">Đặt hàng</Link>
      </div>
    </div>
  );
};

export default CartSidebar;
