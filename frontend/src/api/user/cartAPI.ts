import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchCart = async () => {
  const res = await axios.get(`${API}/cart`, { withCredentials: true });
  return res.data;
};

export const addToCartAPI = async (product_id: string, quantity: number, price: number) => {
  const res = await axios.post(`${API}/cart`, { product_id, quantity, price }, { withCredentials: true });
  return res.data;
};

export const updateCartItemAPI = async (product_id: string, quantity: number) => {
  const res = await axios.put(`${API}/cart`, { product_id, quantity }, { withCredentials: true });
  return res.data;
};

export const removeCartItemAPI = async (product_id: string) => {
  const res = await axios.delete(`${API}/cart`, {
    data: { product_id },
    withCredentials: true
  });
  return res.data;
};

export const clearCartAPI = async () => {
  const res = await axios.delete(`${API}/cart/clear`, { withCredentials: true });
  return res.data;
};
