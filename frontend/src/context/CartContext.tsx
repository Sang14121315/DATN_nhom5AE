import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Kiểu dữ liệu sản phẩm trong giỏ hàng
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  img_url: string;
  quantity: number;
}

// Kiểu dữ liệu context
interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

// Context mặc định
const CartContext = createContext<CartContextType | null>(null);

// Reducer xử lý hành động
type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(item => item._id === action.payload._id);
      if (existingItem) {
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];
    }
    case "REMOVE_FROM_CART":
      return state.filter(item => item._id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Tính tổng số lượng và tổng tiền
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Các hàm xử lý
  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantity,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để dùng trong component
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
