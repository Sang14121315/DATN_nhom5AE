import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // ✅ Đảm bảo gửi cookie mỗi request
});

export default instance;

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('🔍 Axios Interceptor - Token:', token);
  console.log('🔍 Axios Interceptor - URL:', config.url);
  console.log('🔍 Axios Interceptor - Method:', config.method);
  console.log('🔍 Axios Interceptor - Full URL:', (config.baseURL || '') + (config.url || ''));
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Axios Interceptor - Headers set:', config.headers);
    console.log('✅ Axios Interceptor - Authorization header:', config.headers.Authorization);
  } else {
    console.log('❌ Axios Interceptor - No token found in localStorage');
    console.log('❌ Axios Interceptor - Available localStorage keys:', Object.keys(localStorage));
  }
  
  return config;
}, (error) => {
  console.error('❌ Axios Interceptor - Request error:', error);
  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  console.log('✅ Axios Interceptor - Response:', response.status, response.config.url);
  return response;
}, (error) => {
  console.error('❌ Axios Interceptor - Response error:', error.response?.status, error.response?.data);
  console.error('❌ Axios Interceptor - Error config:', error.config);
  console.error('❌ Axios Interceptor - Error message:', error.message);
  return Promise.reject(error);
});

