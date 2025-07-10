import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/pages/admin/products.scss';
import {
  Product,
  fetchFilteredProducts,
  ProductQueryParams,
  ProductListResponse
} from '../../api/productsAPI';
import { formatCurrency } from '@/api/productsAPI';
import { fetchAllBrands } from '@/api/brandAPI';
import { fetchAllCategories } from '@/api/categoryAPI';
import { fetchAllProductTypes } from '@/api/productTypeAPI'; // ✅ nhớ tạo API nếu chưa có

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'view' | 'created_at'>('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);

      const params: ProductQueryParams = {
        page: currentPage,
        limit: 10,
        search,
        sortBy,
        order,
        category: selectedCategory,
        brand: selectedBrand,
        type: selectedType,
      };

      const data: ProductListResponse = await fetchFilteredProducts(params);

      if (!data || !Array.isArray(data.products)) {
        throw new Error('Dữ liệu không hợp lệ từ API');
      }

      setProducts(data.products);
      setTotalPages(data.totalPages ?? 1);
      setTotal(data.total ?? data.products.length);
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search, sortBy, order, selectedCategory, selectedBrand, selectedType]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [cats, brs, tys] = await Promise.all([
          fetchAllCategories({}),
          fetchAllBrands({}),
          fetchAllProductTypes({}),
        ]);
        setCategories(cats);
        setBrands(brs);
        setTypes(tys);
      } catch (err) {
        console.error('Lỗi tải filter:', err);
      }
    };
    fetchFilters();
  }, []);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN').replace(/\//g, '-');
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSortToggle = () => {
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) return <div className="products-page">Đang tải danh sách sản phẩm...</div>;
  if (error) return <div className="products-page error">{error}</div>;

  return (
    <div className="products-page">
      <h1>Sản phẩm</h1>

      <div className="filters">
        <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">Danh mục</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        <select onChange={e => setSelectedType(e.target.value)} value={selectedType}>
          <option value="">Loại</option>
          {types.map((type: any) => (
            <option key={type._id} value={type._id}>{type.name}</option>
          ))}
        </select>

        <select onChange={e => setSelectedBrand(e.target.value)} value={selectedBrand}>
          <option value="">Thương hiệu</option>
          {brands.map((brand: any) => (
            <option key={brand._id} value={brand._id}>{brand.name}</option>
          ))}
        </select>

        <button onClick={handleSortToggle}>⬍ Giá {order === 'asc' ? '↑' : '↓'}</button>

        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button className="add-button" onClick={() => navigate('/admin/products/create')}>+ Thêm sản phẩm</button>

      </div>

      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Ngày</th>
            <th>Số lượng</th>
            <th>Danh mục</th>
            <th>Loại</th>
            <th>Thương hiệu</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product._id}>
                <td className="product-cell">
                  <div className="image-placeholder">
                    {product.img_url && <img src={product.img_url} alt={product.name} />}
                  </div>
                  <span>{product.name}</span>
                </td>
                <td>{formatCurrency(product.price)}</td>
                <td>{formatDate(product.created_at)}</td>
                <td>{product.stock}</td>
                <td>{(product.category_id as any)?.name || '—'}</td>
                <td>{(product.product_type_id as any)?.name || '—'}</td>
                <td>{(product.brand_id as any)?.name || '—'}</td>
                <td><span className="status approved">Đã duyệt</span></td>
                <td>
                <button className="view-btn" onClick={() => navigate(`/admin/products/${product._id}/form`)}>👁️ Xem</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>Không có sản phẩm</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <span>Hiển thị {products.length} / {total} sản phẩm</span>
        <div className="pages">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={page === currentPage ? 'active' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
