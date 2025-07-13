import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/styles/pages/admin/products.scss';

import { Product, fetchAllProducts, ProductQueryParams } from '@/api/productsAPI';
import { fetchAllCategories } from '@/api/categoryAPI';
import { fetchAllBrands } from '@/api/brandAPI';
import { fetchAllProductTypes } from '@/api/productTypeAPI';
import { formatCurrency } from '@/api/productsAPI';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [filters, setFilters] = useState<ProductQueryParams>({});
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts({ ...filters, name: search });
      setProducts(data.products);
      setError(null);
    } catch (err) {
      console.error('Lỗi tải sản phẩm:', err);
      setError('Không thể tải sản phẩm. Vui lòng thử lại.');
    }
  };

  const loadFilters = async () => {
    try {
      const [cats, brs, tys] = await Promise.all([
        fetchAllCategories({}),
        fetchAllBrands({}),
        fetchAllProductTypes({})
      ]);
      setCategories(cats);
      setBrands(brs);
      setTypes(tys);
    } catch (err) {
      console.error('Lỗi tải bộ lọc:', err);
    }
  };

  useEffect(() => {
    loadFilters();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [filters, search]);

  const handleFilterChange = (name: keyof ProductQueryParams, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value || undefined }));
    setCurrentPage(1);
  };

  const handleSortByPrice = () => {
    setFilters(prev => ({
      ...prev,
      sortBy: 'price',
      order: prev.order === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  const paginated = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="products-page">
      <h1>Sản phẩm</h1>

<div className="filters">
  <div className="filter-group">
    <select onChange={e => handleFilterChange('category_id', e.target.value)}>
      <option value="">📂 Danh mục</option>
      {categories.map((cat: any) => (
        <option key={cat._id} value={cat._id}>{cat.name}</option>
      ))}
    </select>

    <select onChange={e => handleFilterChange('product_type_id', e.target.value)}>
      <option value="">📄 Loại</option>
      {types.map((type: any) => (
        <option key={type._id} value={type._id}>{type.name}</option>
      ))}
    </select>

    <select onChange={e => handleFilterChange('brand_id', e.target.value)}>
      <option value="">🔁 Thương hiệu</option>
      {brands.map((brand: any) => (
        <option key={brand._id} value={brand._id}>{brand.name}</option>
      ))}
    </select>

    

    <input
      type="text"
      placeholder="Tìm kiếm..."
      value={search}
      onChange={e => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

  <button className="add-button" onClick={() => navigate('/admin/products/create')}>
    ＋ Thêm sản phẩm
  </button>
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
          {paginated.length > 0 ? (
            paginated.map((product) => (
              <tr key={product._id}>
                <td className="product-cell">
                  <div className="image-placeholder">
                    {product.img_url && (
                      <img src={product.img_url} alt={product.name} />
                    )}
                  </div>
                  <span>{product.name}</span>
                </td>
                <td>{formatCurrency(product.price)}</td>
                <td>{product.created_at ? new Date(product.created_at).toLocaleDateString('vi-VN') : '—'}</td>
                <td>{product.stock}</td>
                <td>{(product.category_id as any)?.name || '—'}</td>
                <td>{(product.product_type_id as any)?.name || '—'}</td>
                <td>{(product.brand_id as any)?.name || '—'}</td>
                <td><span className="status approved">Đã duyệt</span></td>
                <td>
                  <button className="view-btn" onClick={() => navigate(`/admin/products/${product._id}/form`)}>
                    👁️ Xem
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={9}>Không có sản phẩm.</td></tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <span>Hiển thị {paginated.length} / {products.length} sản phẩm</span>
        <div className="pages">
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
