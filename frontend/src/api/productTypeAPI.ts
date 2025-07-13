import axios from 'axios';

export interface ProductType {
  _id: string;
  name: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// ✅ Lấy tất cả loại sản phẩm với bộ lọc
export const fetchAllProductTypes = async (filters: {
  name?: string;
  category_id?: string;
  startDate?: string;
  endDate?: string;
} = {}): Promise<ProductType[]> => {
  try {
    const params = new URLSearchParams();

    if (filters.name) params.append('name', filters.name);
    if (filters.category_id) params.append('category_id', filters.category_id);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);

    const url = `http://localhost:5000/api/product-types?${params.toString()}`;
    const response = await axios.get(url);
    console.log('API Response:', response.data); // Debug dữ liệu trả về
    return response.data;
  } catch (error) {
    console.error('Error fetching product types:', error);
    throw new Error('Không thể tải loại sản phẩm');
  }
};

// ✅ Lấy 1 loại sản phẩm theo ID
export const getProductTypeById = async (id: string): Promise<ProductType> => {
  const response = await axios.get(`http://localhost:5000/api/product-types/${id}`);
  return response.data;
};

// ✅ Tạo mới loại sản phẩm
export const createProductType = async (data: Partial<ProductType>): Promise<ProductType> => {
  try {
    console.log('API: Sending request to create product type');
    console.log('API: Data:', data);
    const response = await axios.post('http://localhost:5000/api/product-types', data);
    console.log('API: Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.log('API: Error response:', error.response?.data);
    console.log('API: Error status:', error.response?.status);
    throw error;
  }
};

// ✅ Cập nhật loại sản phẩm
export const updateProductType = async (id: string, data: Partial<ProductType>): Promise<ProductType> => {
  const response = await axios.put(`http://localhost:5000/api/product-types/${id}`, data);
  return response.data;
};

// ✅ Xóa loại sản phẩm
export const deleteProductType = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:5000/api/product-types/${id}`);
};

 