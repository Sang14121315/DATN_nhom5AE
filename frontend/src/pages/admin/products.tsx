import React, { useEffect, useState } from 'react';
import '@/styles/pages/admin/products.scss';
import {
  Product,
  fetchFilteredProducts,
  ProductQueryParams,
  ProductListResponse
} from '../../api/productsAPI';
import { formatCurrency } from '@/api/productsAPI';

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const params: ProductQueryParams = {
        page: currentPage,
        limit: 10,
        search,
        sortBy,
        order,
      };
      const data: ProductListResponse = await fetchFilteredProducts(params);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (err) {
      setError('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };
// useEffect(() => {
//   fetchData();
// }, [currentPage, search, sortBy, order]);
 useEffect(() => {
  // Dữ liệu mẫu hiển thị trước khi có API
  const sampleData: Product[] = [
    {
      _id: '1',
      slug: 'cpu-intel-i5',
      name: 'CPU Intel Core i5-10400F - TRAY NEW',
      description: 'Mô tả ngắn gọn',
      price: 1980000,
      stock: 10,
      img_url: '',
      category_id: { _id: 'cat1', name: 'CPU' },
      brand_id: { _id: 'brand1', name: 'Intel' },
      product_type_id: { _id: 'type1', name: 'Intel CPU' },
      sale: false,
      view: 123,
      hot: false,
      coupons_id: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    
  ];

  setProducts(sampleData);
  setTotal(sampleData.length);
  setTotalPages(1);
  setLoading(false);
}, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN').replace(/\//g, '-');
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleSortToggle = () => {
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) return <div>Đang tải danh sách sản phẩm...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="products-page">
      <h1>Sản phẩm</h1>

      <div className="filters">
         <button onClick={() => setSortBy('price')}> Danh mục</button>
         <button onClick={() => setSortBy('price')}> Loại</button>
          <button onClick={() => setSortBy('price')}>Thương hiệu</button>
        <button onClick={() => setSortBy('price')}>⬍ Giá</button>
        
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="add-button">+ Thêm sản phẩm</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th onClick={handleSortToggle}>Giá {order === 'asc' ? '↑' : '↓'}</th>
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
                <td>{product.category_id?.name || '—'}</td>
                <td>{product.product_type_id?.name || '—'}</td>
                <td>{product.brand_id?.name || '—'}</td>
                <td><span className="status approved">Đã duyệt</span></td>
                <td><button className="view-btn">👁️ Xem</button></td>
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
