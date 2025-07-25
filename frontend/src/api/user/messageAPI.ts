import axios from '../axios';

export interface Message {
  _id?: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at?: string;
}

// Lấy lịch sử chat giữa user hiện tại và admin (hoặc user khác)
export async function fetchConversation(receiver_id: string) {
  const res = await axios.get(`/messages`, { params: { receiver_id } });
  return res.data as Message[];
}

// Gửi tin nhắn
export async function sendMessage(receiver_id: string, content: string) {
  const res = await axios.post(`/messages`, { receiver_id, content });
  return res.data as Message;
} 