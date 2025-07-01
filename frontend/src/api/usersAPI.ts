import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Đăng ký
export const register = async (data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}): Promise<AuthResponse> => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

// Đăng nhập
export const login = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

// Quên mật khẩu
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const res = await axios.post(`${API_URL}/forgot-password`, { email });
  return res.data;
};

// Đặt lại mật khẩu
export const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
  const res = await axios.post(`${API_URL}/reset-password`, { token, newPassword });
  return res.data;
};

// Lấy danh sách người dùng (có thể filter)
export const getUsers = async (filters: {
  name?: string;
  email?: string;
  role?: string;
}): Promise<User[]> => {
  const res = await axios.get(API_URL, {
    params: filters,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return res.data;
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id: string): Promise<User> => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return res.data;
};

// Cập nhật người dùng
export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const res = await axios.put(`${API_URL}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return res.data;
};

// Xóa người dùng
export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return res.data;
};
