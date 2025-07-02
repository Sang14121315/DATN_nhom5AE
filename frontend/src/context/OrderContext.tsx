import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  name?: string;
  img_url?: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
}

interface OrderPayload {
  customer: CustomerInfo;
  city: string;
  district: string;
  ward: string;
  payment_method: "cod" | "bank";
  items: OrderItem[];
  total: number;
}

interface Order {
  _id: string;
  customer: CustomerInfo;
  status: string;
  date: string;
  total: number;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: OrderPayload) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`, { withCredentials: true });
      setOrders(res.data);
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách đơn hàng:", error);
    }
  };

  const addOrder = async (order: OrderPayload) => {
    try {
      await axios.post(`${API_URL}/orders`, order, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });
      await fetchOrders(); // cập nhật lại sau khi tạo
    } catch (error) {
      console.error("❌ API tạo đơn hàng thất bại:", error);
      throw error;
    }
  };

 const cancelOrder = async (orderId: string) => {
  try {
    await axios.patch(`${API_URL}/orders/${orderId}`, { status: "cancelled" }, {
      withCredentials: true
    });
    await fetchOrders();
    alert("✅ Đã huỷ đơn hàng.");
  } catch (error: any) {
    const message = error.response?.data?.message || "Lỗi không xác định khi huỷ đơn hàng";
    alert(`❌ Không thể huỷ đơn: ${message}`);
    console.error("❌ Lỗi huỷ đơn hàng:", error);
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders phải được dùng bên trong OrderProvider");
  return context;
};
