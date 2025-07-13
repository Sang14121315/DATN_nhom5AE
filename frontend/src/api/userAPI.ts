import axios from 'axios'; // đường dẫn tới file axios.ts


// Định nghĩa kiểu dữ liệu User
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin';
  isBlocked?: boolean;
  created_at?: string;
  updated_at?: string;
}

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
  const response = await axios.post(`${BASE_URL}/register`, userData, {
    withCredentials: true, // gửi cookie (token)
  });
  return response.data;
};

// -------------------------
// API: Đăng nhập
// -------------------------
export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ token: string; user: User }> => {
  const response = await axios.post(`${BASE_URL}/login`, credentials, {
    withCredentials: true, // gửi cookie (token)
  });
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
  const response = await axios.get(`${BASE_URL}/users`, {
    withCredentials: true,
  });
  return response.data;
};

// -------------------------
// API: Lấy chi tiết người dùng theo ID
// -------------------------
export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

// -------------------------
// API: Cập nhật người dùng
// -------------------------
export const updateUser = async (
  userId: string,
  updatedData: Partial<Omit<User, '_id' | 'created_at' | 'updated_at' | 'role'>>
): Promise<User> => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, updatedData, {
    withCredentials: true,
  });
  return response.data;
};

// -------------------------
// API: Xóa người dùng
// -------------------------
export const deleteUser = async (userId: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${BASE_URL}/users/${userId}`, {
    withCredentials: true,
  });
  return response.data;
};

// -------------------------
// API: Khóa/mở khóa người dùng (admin)
// -------------------------
export const blockUser = async (userId: string, block: boolean): Promise<User> => {
  const response = await axios.patch(`${BASE_URL}/users/${userId}/block`, { block }, {
    withCredentials: true,
  });
  return response.data;
};
