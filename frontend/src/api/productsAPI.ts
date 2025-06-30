import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

// Interfaces
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
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  totalPages: number;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: 'price' | 'created_at' | 'view';
  order?: 'asc' | 'desc';
  category_id?: string;
  brand_id?: string;
  minPrice?: number;
  maxPrice?: number;
  sale?: boolean;
  hot?: boolean;
}

// Utils
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

// API: Lấy sản phẩm có lọc, phân trang, sắp xếp
export const fetchFilteredProducts = async (params: ProductQueryParams): Promise<ProductListResponse> => {
  try {
    const response = await axios.get(API_URL, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Nếu backend chỉ trả về mảng
    if (Array.isArray(response.data)) {
      return {
        products: response.data,
        total: response.data.length,
        totalPages: 1,
      };
    }

    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi fetch sản phẩm:', error);
    throw new Error('Không thể tải danh sách sản phẩm');
  }
};

// API: Lấy chi tiết sản phẩm
export const fetchProductDetail = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    throw new Error('Không thể lấy chi tiết sản phẩm');
  }
};

// API: Tạo sản phẩm
export const createProduct = async (productData: FormData): Promise<Product> => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi tạo sản phẩm:', error);
    throw new Error('Không thể tạo sản phẩm');
  }
};

// API: Cập nhật sản phẩm
export const updateProduct = async (id: string, productData: FormData): Promise<Product> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi cập nhật sản phẩm:', error);
    throw new Error('Không thể cập nhật sản phẩm');
  }
};

// API: Xoá sản phẩm
export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Lỗi khi xoá sản phẩm:', error);
    throw new Error('Không thể xoá sản phẩm');
  }
};
