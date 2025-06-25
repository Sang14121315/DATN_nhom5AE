import axios from 'axios';

export interface Product {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  img_url?: string;
  category_id: {
    _id: string;
    name: string;
  };
  brand_id: {
    _id: string;
    name: string;
  };
  product_type_id: {
    _id: string;
    name: string;
  };
  sale?: boolean;
  view?: number;
  hot?: boolean;
  coupons_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  brand?: string;
  productType?: string;
  sale?: boolean;
  hot?: boolean;
  sortBy?: 'price' | 'view' | 'created_at';
  order?: 'asc' | 'desc';
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const BASE_URL = 'http://localhost:5000/api/products';
const token = localStorage.getItem('token');

// Format currency
export const formatCurrency = (value: number): string => {
  return `${value.toLocaleString()} VNĐ`;
};

// ========== API CALLS ==========

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
  const res = await axios.post(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
  const res = await axios.put(`${BASE_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.status === 200;
};

// ✅ Lấy sản phẩm có phân trang, tìm kiếm, sắp xếp
export const fetchFilteredProducts = async (params: ProductQueryParams): Promise<ProductListResponse> => {
  const query = new URLSearchParams();

  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.category) query.append('category', params.category);
  if (params.brand) query.append('brand', params.brand);
  if (params.productType) query.append('productType', params.productType);
  if (params.sale !== undefined) query.append('sale', String(params.sale));
  if (params.hot !== undefined) query.append('hot', String(params.hot));
  if (params.sortBy) query.append('sortBy', params.sortBy);
  if (params.order) query.append('order', params.order);

  const res = await axios.get(`${BASE_URL}?${query.toString()}`);
  return res.data;
};
