import axiosInstance from './axios';

export interface ProductType {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  created_at?: string;
}

export const fetchAllProductTypes = async (
  params: Record<string, any> = {}
): Promise<ProductType[]> => {
  try {
    const res = await axiosInstance.get('/product-types', { params });
    return res.data.data || [];
  } catch (err) {
    console.error('Lỗi lấy danh sách loại sản phẩm:', err);
    return [];
  }
};

export const getProductTypeById = async (id: string): Promise<ProductType> => {
  const res = await axiosInstance.get(`/product-types/${id}`);
  return res.data.data;
};

export const createProductType = async (data: Partial<ProductType>) => {
  const res = await axiosInstance.post('/product-types', data);
  return res.data.data;
};

export const updateProductType = async (id: string, data: Partial<ProductType>) => {
  const res = await axiosInstance.put(`/product-types/${id}`, data);
  return res.data.data;
};

export const deleteProductType = async (id: string) => {
  const res = await axiosInstance.delete(`/product-types/${id}`);
  return res.data.message;
};

// ✅ Thêm alias để tương thích với các file đang import { fetchProductTypes }
export const fetchProductTypes = fetchAllProductTypes;
