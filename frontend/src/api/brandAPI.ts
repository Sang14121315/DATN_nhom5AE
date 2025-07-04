import axios from 'axios';

export interface Brand {
  _id: string;
  slug: string;
  name: string;
  logo_url?: string;
  parent?: string | { _id: string; name: string } | null;
  created_at?: string;
  updated_at?: string;
}

// ✅ Lấy tất cả thương hiệu với bộ lọc
export const fetchAllBrands = async (filters: {
  name?: string;
  parent?: string;
  startDate?: string;
  endDate?: string;
} = {}): Promise<Brand[]> => {
  try {
    const params = new URLSearchParams();

    if (filters.name) params.append('name', filters.name);
    if (filters.parent) params.append('parent', filters.parent);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const url = `http://localhost:5000/api/brands?${params.toString()}`;
    const response = await axios.get(url);
    console.log('API Response:', response.data); // Debug dữ liệu trả về
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw new Error('Không thể tải thương hiệu');
  }
};

// ✅ Lấy 1 thương hiệu theo ID
export const getBrandById = async (id: string): Promise<Brand> => {
  const response = await axios.get(`http://localhost:5000/api/brands/${id}`);
  return response.data;
};

// ✅ Tạo mới thương hiệu
export const createBrand = async (data: Partial<Brand>): Promise<Brand> => {
  const response = await axios.post('http://localhost:5000/api/brands', data);
  return response.data;
};

// ✅ Upload logo (file)
export const uploadLogo = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('logo', file);

  const res = await axios.post('http://localhost:5000/api/upload/brand-logo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data.url; // Trả về đường dẫn logo_url
};

// ✅ Cập nhật thương hiệu
export const updateBrand = async (id: string, data: Partial<Brand>): Promise<Brand> => {
  const response = await axios.put(`http://localhost:5000/api/brands/${id}`, data);
  return response.data;
};

// ✅ Xóa thương hiệu
export const deleteBrand = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:5000/api/brands/${id}`);
};
