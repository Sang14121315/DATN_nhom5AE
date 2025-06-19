import axios from 'axios';

// Kiểu dữ liệu Contact
export interface Contact {
  _id?: string;
  title: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  user_id?: string;
  message_id?: string;
  status?: 'pending' | 'replied' | 'closed';
  created_at?: string;
  updated_at?: string;
}

// Base URL của API
const BASE_URL = 'http://localhost:5000/api/contacts';

// Gửi liên hệ mới
export const createContact = async (data: Contact): Promise<{ message: string }> => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

// Lấy danh sách tất cả liên hệ (có thể lọc theo trạng thái)
export const getContacts = async (status?: string): Promise<Contact[]> => {
  const url = status ? `${BASE_URL}?status=${status}` : BASE_URL;
  const response = await axios.get(url);
  return response.data;
};

// Cập nhật trạng thái liên hệ
export const updateContactStatus = async (
  contactId: string,
  status: 'pending' | 'replied' | 'closed'
): Promise<Contact> => {
  const response = await axios.put(`${BASE_URL}/${contactId}`, { status });
  return response.data;
};
