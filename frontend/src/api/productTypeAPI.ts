import axiosInstance from './axios';

export interface ProductType {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  created_at?: string;
}

export const fetchAllProductTypes = async (
  params: Record<string, string | number | boolean> = {}
): Promise<ProductType[]> => {
  try {
    const res = await axiosInstance.get('/product-types', { params });
    console.log('Product types response:', res.data);
    return res.data || [];
  } catch (err) {
    console.error('Lỗi lấy danh sách loại sản phẩm:', err);
    return [];
  }
};

export const getProductTypeById = async (id: string): Promise<ProductType> => {
  const res = await axiosInstance.get(`/product-types/${id}`);
  return res.data;
};

export const createProductType = async (data: Partial<ProductType>) => {
  const res = await axiosInstance.post('/product-types', data);
  return res.data;
};

export const updateProductType = async (id: string, data: Partial<ProductType>) => {
  const res = await axiosInstance.put(`/product-types/${id}`, data);
  return res.data;
};

export const deleteProductType = async (id: string) => {
  const res = await axiosInstance.delete(`/product-types/${id}`);
  return res.data.message;
};

// ✅ Thêm alias để tương thích với các file đang import { fetchProductTypes }
export const fetchProductTypes = fetchAllProductTypes;
