// ✅ brandAPI.ts
import axios from 'axios';

export interface Brand {
  _id: string;
  slug: string;
  name: string;
  logo_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const fetchAllBrands = async (): Promise<Brand[]> => {
  const response = await axios.get('http://localhost:5000/api/brands');
  return response.data;
};

export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await axios.get(`http://localhost:5000/api/brands/${id}`);
  return response.data;
};

export const createBrand = async (data: Partial<Brand>): Promise<Brand> => {
  const response = await axios.post('http://localhost:5000/api/brands', data);
  return response.data;
};

// Upload logo
export const uploadLogo = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("logo", file);

  const res = await axios.post("http://localhost:5000/api/upload/brand-logo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url; // Trả về đường dẫn logo_url
};

export const updateBrand = async (id: string, data: Partial<Brand>): Promise<Brand> => {
  const response = await axios.put(`http://localhost:5000/api/brands/${id}`, data);
  return response.data;
};

export const deleteBrand = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:5000/api/brands/${id}`);
};
