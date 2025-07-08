import axios from '@/api/axios';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  img_url?: string;
  category_id?: { _id: string; name: string };
  brand_id?: { _id: string; name: string };
  product_type_id?: { _id: string; name: string };
  sale?: boolean;
  hot?: boolean;
  view?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  totalPages: number;
}

export interface ProductQueryParams {
  name?: string;
  category_id?: string;
  brand_id?: string;
  minPrice?: number;
  maxPrice?: number;
  sale?: boolean;
  hot?: boolean;
  sort?: 'price_asc' | 'price_desc' | 'view_desc';
  page?: number;
  limit?: number;
}

// ✅ Hàm format tiền
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// ✅ Hàm build query (giống brand/category API)
const buildQueryParams = (filters: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value.toString());
    }
  });
  return params;
};

// ✅ Lấy danh sách sản phẩm với filter & pagination
export const fetchAllProducts = async (
  filters: ProductQueryParams = {}
): Promise<ProductListResponse> => {
  try {
    const params = buildQueryParams(filters);
    const response = await axios.get(`/products?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi fetch danh sách sản phẩm:', error);
    throw new Error('Không thể tải danh sách sản phẩm');
  }
};

// ✅ Lấy 1 sản phẩm theo ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi fetch chi tiết sản phẩm:', error);
    throw new Error('Không thể tải chi tiết sản phẩm');
  }
};

// ✅ Tạo mới sản phẩm (dùng FormData)
export const createProduct = async (data: FormData): Promise<Product> => {
  try {
    const response = await axios.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    throw new Error('Không thể tạo sản phẩm');
  }
};

// ✅ Cập nhật sản phẩm
export const updateProduct = async (id: string, data: FormData): Promise<Product> => {
  try {
    const response = await axios.put(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    throw new Error('Không thể cập nhật sản phẩm');
  }
};

// ✅ Xóa sản phẩm
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`/products/${id}`);
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    throw new Error('Không thể xoá sản phẩm');
  }
};
