import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '@/styles/pages/user/productList.scss';

interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  img_url: string;
  category_id: string;
  brand_id: string;
  product_type_id: string;
  sale: boolean;
  hot: boolean;
  created_at: string;
  updated_at: string;
}

const ProductListPage: React.FC = () => {
  const { productTypeId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = new URL('http://localhost:3000/api/products'); // Đổi lại nếu khác

        if (productTypeId) url.searchParams.append('product_type_id', productTypeId);
        if (selectedCategory !== 'all') url.searchParams.append('category_id', selectedCategory);
        if (selectedBrand !== 'all') url.searchParams.append('brand_id', selectedBrand);

        const response = await fetch(url.toString());
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };

    fetchProducts();
  }, [productTypeId, selectedCategory, selectedBrand]);

  return (
    <div className="product-page-container">
      <div className="product-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Danh mục sản phẩm</h3>
            <ul>
              <li onClick={() => setSelectedCategory('all')}>Tất cả</li>
              <li onClick={() => setSelectedCategory('665f3e62e5c5bfb7427d4b20')}>Intel</li>
              <li onClick={() => setSelectedCategory('665f3e62e5c5bfb7427d4b21')}>AMD</li>
              {/* Thay ID thật ở đây nếu có */}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Thương hiệu</h3>
            <label>
              <input
                type="radio"
                name="brand"
                value="all"
                checked={selectedBrand === 'all'}
                onChange={() => setSelectedBrand('all')}
              />
              Tất cả
            </label>
            <label>
              <input
                type="radio"
                name="brand"
                value="6660b7bfe0d81b30849f3344"
                onChange={() => setSelectedBrand('6660b7bfe0d81b30849f3344')}
              />
              Intel
            </label>
            <label>
              <input
                type="radio"
                name="brand"
                value="6660b7cfe0d81b30849f3345"
                onChange={() => setSelectedBrand('6660b7cfe0d81b30849f3345')}
              />
              AMD
            </label>
          </div>

          {/* Lọc giá – để sau */}
          <div className="sidebar-section">
            <h3>Lọc giá</h3>
            <label><input type="radio" name="price" disabled /> Dưới 5 triệu</label>
            <label><input type="radio" name="price" disabled /> 5 - 10 triệu</label>
            <label><input type="radio" name="price" disabled /> 10 - 20 triệu</label>
            <label><input type="radio" name="price" disabled /> Trên 20 triệu</label>
          </div>
        </aside>

        {/* Content */}
        <main className="product-content">
          <div className="product-banner">
            <img src="/assets/banner_productList.png" alt="Banner" />
          </div>

          <div className="product-header">
            <h2>Sản phẩm</h2>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={product.img_url} alt={product.name} />
                <p className="product-brand">{product.slug}</p>
                <h4 className="product-name">{product.name}</h4>
                <div className="price-block">
                  <span className="discount">{formatCurrency(product.price)}</span>
                </div>
                <button className="add-to-cart">
                  <FaShoppingCart /> Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListPage;
