import axios from '@/api/axios';

export interface ProductType {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Lấy tất cả loại sản phẩm
export const fetchProductTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await axios.get('/product-types');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải loại sản phẩm:', error);
    throw new Error('Không thể tải danh sách loại sản phẩm');
  }
};

// Lấy loại theo ID
export const getProductTypeById = async (id: string): Promise<ProductType> => {
  try {
    const response = await axios.get(`/product-types/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy loại sản phẩm:', error);
    throw new Error('Không thể tải loại sản phẩm');
  }
};

// Tạo loại sản phẩm
export const createProductType = async (data: Partial<ProductType>): Promise<ProductType> => {
  try {
    const response = await axios.post('/product-types', data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo loại sản phẩm:', error);
    throw new Error('Không thể tạo loại sản phẩm');
  }
};

// Cập nhật loại sản phẩm
export const updateProductType = async (id: string, data: Partial<ProductType>): Promise<ProductType> => {
  try {
    const response = await axios.put(`/product-types/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật loại sản phẩm:', error);
    throw new Error('Không thể cập nhật loại sản phẩm');
  }
};

// Xóa loại sản phẩm
export const deleteProductType = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/product-types/${id}`);
  } catch (error) {
    console.error('Lỗi khi xóa loại sản phẩm:', error);
    throw new Error('Không thể xóa loại sản phẩm');
  }
};
