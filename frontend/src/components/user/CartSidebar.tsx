import React from 'react';
import { FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import '@/styles/components/user/cartSidebar.scss';
import { Link } from "react-router-dom";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

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
            <div className="item-info">
              <p>{item.name}</p>
              <p>{item.price.toLocaleString()} đ</p>
              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(item._id)}><FaMinus /></button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item._id)}><FaPlus /></button>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <p>Tổng tiền: {totalPrice.toLocaleString()} đ</p>
        <Link to="/checkout" className="checkout-btn no-underline">Đặt hàng</Link>
      </div>
    </div>
  );
};

export default CartSidebar;
