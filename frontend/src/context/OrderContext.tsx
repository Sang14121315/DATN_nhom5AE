// OrderContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: any[];
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  cancelOrder: (id: string) => void; // ✅ THÊM HÀM HUỶ
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const cancelOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within an OrderProvider");
  return context;
};
