import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { staticProducts } from '@/data/products';
import '@/styles/pages/user/productList.scss';

const ProductListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const navigate = useNavigate();


  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);

  const filteredProducts = staticProducts.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <div className="product-page-container">
      <div className="product-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Danh mục sản phẩm</h3>
            <ul>
              <li onClick={() => setSelectedCategory('all')}>Tất cả</li>
              <li onClick={() => setSelectedCategory('intel')}>Intel</li>
              <li onClick={() => setSelectedCategory('amd')}>AMD</li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Nhà cung cấp</h3>
            <label>
              <input
                type="radio"
                name="brand"
                value="intel"
                onChange={() => setSelectedBrand('intel')}
              />
              Intel
            </label>
            <label>
              <input
                type="radio"
                name="brand"
                value="amd"
                onChange={() => setSelectedBrand('amd')}
              />
              AMD
            </label>
          </div>

          <div className="sidebar-section">
            <h3>Lọc giá</h3>
            <label><input type="radio" name="price" onChange={() => setSelectedPrice('<5')} /> Dưới 5 triệu</label>
            <label><input type="radio" name="price" onChange={() => setSelectedPrice('5-10')} /> 5 - 10 triệu</label>
            <label><input type="radio" name="price" onChange={() => setSelectedPrice('10-20')} /> 10 - 20 triệu</label>
            <label><input type="radio" name="price" onChange={() => setSelectedPrice('>20')} /> Trên 20 triệu</label>
          </div>
        </aside>

        {/* Product grid */}
        <main className="product-content">
            <div className="product-banner">
        <img src="./public/assets/banner_productList.png" alt="Banner" />
      </div>
          <div className="product-header">
            
            <h2>CPU</h2>
            
            {/* <div className="sort-box">
              <FaFilter />
              <select>
                <option>Sắp xếp</option>
                <option>Giá thấp đến cao</option>
                <option>Giá cao đến thấp</option>
              </select>
            </div> */}
          </div>


          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
                <p className="product-brand">INTEL</p>
                <h4 className="product-name">{product.name}</h4>
                {/* <p className="product-description">{product.shortDescription}</p> */}
                <div className="price-block">
                  {product.discountPrice && (
                    <>
                      <span className="discount">{formatCurrency(product.discountPrice)}</span>
                      <span className="original">{formatCurrency(product.price)}</span>
                    </>
                  )}
                  {!product.discountPrice && (
                    <span className="discount">{formatCurrency(product.price)}</span>
                  )}
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
