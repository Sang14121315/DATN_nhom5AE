import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // ✅ Đảm bảo gửi cookie mỗi request
});

export default instance;

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Axios Interceptor - Token:', token);
  console.log('Axios Interceptor - URL:', config.url);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Axios Interceptor - Headers:', config.headers);
  }
  return config;
});

