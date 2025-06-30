import axios from "axios";

export interface Category {
  _id?: string;
  slug: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Lấy tất cả danh mục
export const fetchAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get("http://localhost:5000/api/categories");
  return response.data;
};

// Lấy danh mục theo ID
export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await axios.get(`http://localhost:5000/api/categories/${id}`);
  return response.data;
};

// Tạo mới danh mục
export const createCategory = async (data: Partial<Category>): Promise<Category> => {
  const response = await axios.post("http://localhost:5000/api/categories", data);
  return response.data;
};

// Cập nhật danh mục
export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  const response = await axios.put(`http://localhost:5000/api/categories/${id}`, data);
  return response.data;
};

// Xóa danh mục
export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:5000/api/categories/${id}`);
};
