// import axios from 'axios';

// const API_URL = `${process.env.REACT_APP_API_URL}/admin/products`;

// export const getProducts = async (page: number = 1, limit: number = 10) => {
//   try {
//     const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createProduct = async (productData: FormData) => {
//   try {
//     const response = await axios.post(API_URL, productData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateProduct = async (id: string, productData: FormData) => {
//   try {
//     const response = await axios.put(`${API_URL}/${id}`, productData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteProduct = async (id: string) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${id}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };