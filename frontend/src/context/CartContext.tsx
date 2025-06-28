import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fetchCart,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI
} from '@/api/user/cartAPI';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  img_url: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  isSidebarOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  increaseQuantity: (id: string) => Promise<void>;
  decreaseQuantity: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const loadCart = async () => {
    try {
      const data = await fetchCart();

      // ✅ Check nếu không có items thì log ra để debug
      if (!data || !Array.isArray(data.items)) {
        console.warn('Cart data không hợp lệ:', data);
        setCartItems([]); // fallback
        return;
      }

      setCartItems(data.items);
    } catch (error: any) {
      console.error('❌ Lỗi khi load cart:', error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addToCart = async (item: CartItem) => {
    try {
      const existing = cartItems.find(p => p._id === item._id);
      if (existing) {
        await updateCartItemAPI(item._id, existing.quantity + item.quantity);
      } else {
       await addToCartAPI(item._id, item.quantity || 1);
      }
      await loadCart();
    } catch (error: any) {
      console.error('❌ Lỗi khi thêm vào giỏ hàng:', error?.response?.data || error.message);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      await removeCartItemAPI(id);
      await loadCart();
    } catch (error: any) {
      console.error('❌ Lỗi khi xoá sản phẩm:', error?.response?.data || error.message);
    }
  };

  const increaseQuantity = async (id: string) => {
    try {
      const item = cartItems.find(i => i._id === id);
      if (item) {
        await updateCartItemAPI(id, item.quantity + 1);
        await loadCart();
      }
    } catch (error: any) {
      console.error('❌ Lỗi khi tăng số lượng:', error?.response?.data || error.message);
    }
  };

  const decreaseQuantity = async (id: string) => {
    try {
      const item = cartItems.find(i => i._id === id);
      if (item && item.quantity > 1) {
        await updateCartItemAPI(id, item.quantity - 1);
        await loadCart();
      }
    } catch (error: any) {
      console.error('❌ Lỗi khi giảm số lượng:', error?.response?.data || error.message);
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();
      await loadCart();
    } catch (error: any) {
      console.error('❌ Lỗi khi xoá giỏ hàng:', error?.response?.data || error.message);
    }
  };

  const openCart = () => setIsSidebarOpen(true);
  const closeCart = () => setIsSidebarOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantity,
        isSidebarOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
