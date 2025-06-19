import axios from 'axios';

// Định nghĩa kiểu dữ liệu User
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // Không nên gửi mật khẩu từ client trừ khi đăng ký/đăng nhập
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
  created_at?: string;
  updated_at?: string;
}

// API URL gốc
const BASE_URL = 'http://localhost:5000/api';

// -------------------------
// API: Đăng ký người dùng
// -------------------------
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}): Promise<User> => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

// -------------------------
// API: Đăng nhập
// -------------------------
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ token: string; user: User }> => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data;
};

// -------------------------
// API: Quên mật khẩu
// -------------------------
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
  return response.data;
};

// -------------------------
// API: Đặt lại mật khẩu
// -------------------------
export const resetPassword = async (token: string, newPassword: string): Promise<{ message: string }> => {
  const response = await axios.post(`${BASE_URL}/reset-password`, {
    token,
    newPassword,
  });
  return response.data;
};

// -------------------------
// API: Lấy tất cả người dùng (admin)
// -------------------------
export const fetchAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

// -------------------------
// API: Lấy chi tiết người dùng theo ID
// -------------------------
export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`);
  return response.data;
};

// -------------------------
// API: Cập nhật người dùng
// -------------------------
export const updateUser = async (
  userId: string,
  updatedData: Partial<Omit<User, '_id' | 'created_at' | 'updated_at' | 'role'>>
): Promise<User> => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedData);
  return response.data;
};

// -------------------------
// API: Xóa người dùng
// -------------------------
export const deleteUser = async (userId: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${BASE_URL}/users/${userId}`);
  return response.data;
};
