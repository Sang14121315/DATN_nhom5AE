import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user_id: { _id: string; name: string; email: string; phone: string; address: string };
  coupon_id?: { _id: string; code: string };
  total: number;
  discount?: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at?: string;
  orderDetails?: OrderDetail[];
}

export interface OrderDetail {
  product_id: {
    _id: string;
    name: string;
    img_url?: string;
  };
  quantity: number;
  price: number;
}

export interface OrderFilters {
  user_id?: string;
  status?: string;
  minTotal?: number;
  maxTotal?: number;
  search?: string;
  page?: number;
}

// 📦 Get all orders
export const fetchAllOrders = async (filters: OrderFilters = {}): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>(API_URL, {
      params: filters,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi fetch danh sách đơn hàng:', error);
    throw new Error('Không thể tải đơn hàng');
  }
};

// 📄 Get order detail
export const fetchOrderDetail = async (
  id: string
): Promise<{ order: Order; orderDetails: OrderDetail[] }> => {
  try {
    const response = await axios.get<{ order: Order; orderDetails: OrderDetail[] }>(
      `${API_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi fetch chi tiết đơn hàng:', error);
    throw new Error('Không thể tải chi tiết đơn hàng');
  }
};

// ➕ Create new order
export const createOrder = async (orderData: {
  user_id: string;
  total: number;
  status: string;
  coupon_code?: string;
  items: OrderItem[];
}): Promise<{ message: string; order: Order }> => {
  try {
    const response = await axios.post<{ message: string; order: Order }>(API_URL, orderData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error);
    throw new Error('Không thể tạo đơn hàng');
  }
};

// ✏️ Update order
export const updateOrder = async (id: string, updatedData: Partial<Order>): Promise<Order> => {
  try {
    const response = await axios.put<Order>(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật đơn hàng:', error);
    throw new Error('Không thể cập nhật đơn hàng');
  }
};

// ❌ Delete order
export const deleteOrder = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa đơn hàng:', error);
    throw new Error('Không thể xóa đơn hàng');
  }
};
