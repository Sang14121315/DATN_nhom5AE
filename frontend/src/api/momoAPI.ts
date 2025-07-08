import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const createMomoOrder = async (orderData: any) => {
  const res = await axios.post(`${API_URL}/momo/create`, orderData, { withCredentials: true });
  return res.data;
}; 