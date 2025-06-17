import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '@/styles/pages/user/productList.scss';

import { useCart } from "@/context/CartContext"; 
interface Product {
  _id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  img_url: string;
  category_id: string;
  created_at: string;
  updated_at: string;
  sale: boolean;
  hot: boolean;
}

import { Product, fetchFilteredProducts } from '../../api/user/productAPI';
import { Brand, fetchAllBrands } from '../../api/user/brandAPI';
import { Category, fetchAllCategories } from '../../api/user/categoryAPI';


const ProductListPage: React.FC = () => {
  // const { productTypeId } = useParams(); // có thể dùng sau
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const navigate = useNavigate();
  const [filtersInitialized, setFiltersInitialized] = useState(false);

  // Load danh mục và thương hiệu
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [brandData, categoryData] = await Promise.all([
          fetchAllBrands(),
          fetchAllCategories(),
        ]);
        setBrands(brandData);
        setCategories(categoryData);
      } catch (error) {
        console.error('Lỗi khi tải danh mục hoặc thương hiệu:', error);
      }
    };

    loadInitialData();
  }, []);

  // Load sản phẩm khi chọn lọc
  useEffect(() => {
  if (!filtersInitialized) return; // Đợi filter khôi phục xong

  const fetchProducts = async () => {
    try {
      const filters: {
        category_id?: string;
        brand_id?: string;
        minPrice?: number;
        maxPrice?: number;
      } = {};

      if (selectedCategory !== 'all') filters.category_id = selectedCategory;
      if (selectedBrand !== 'all') filters.brand_id = selectedBrand;

      if (selectedPrice !== 'all') {
        const [min, max] = selectedPrice.split('-').map(Number);
        filters.minPrice = min;
        filters.maxPrice = max;
      }

      const productData = await fetchFilteredProducts(filters);
      setProducts(productData);
    } catch (error) {
      console.error('Lỗi khi tải sản phẩm:', error);
    }
  };

  fetchProducts();
}, [selectedCategory, selectedBrand, selectedPrice, filtersInitialized]);

useEffect(() => {
  const saved = sessionStorage.getItem('productFilters');
  if (saved) {
    const parsed = JSON.parse(saved);
    setSelectedCategory(parsed.category || 'all');
    setSelectedBrand(parsed.brand || 'all');
    setSelectedPrice(parsed.price || 'all');

    setTimeout(() => {
      window.scrollTo(0, parsed.scroll || 0);
    }, 50);
  }

  setFiltersInitialized(true); // <-- báo hiệu đã xong
}, []);



  const { addToCart } = useCart(); // ✅ Lấy hàm thêm vào giỏ từ context

  const allProducts: Product[] = productsData;


  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);

  return (
    <div className="product-page-container">
      <div className="product-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Danh mục sản phẩm</h3>
            <ul>
              <li onClick={() => setSelectedCategory('all')}>Tất cả</li>
              {categories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={selectedCategory === category._id ? 'active' : ''}
                >
                  {category.name}
                </li>
              ))}
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
            {brands.map((brand) => (
              <label key={brand._id}>
                <input
                  type="radio"
                  name="brand"
                  value={brand._id}
                  checked={selectedBrand === brand._id}
                  onChange={() => setSelectedBrand(brand._id)}
                />
                {brand.name}
              </label>
            ))}
          </div>

          <div className="sidebar-section">
            <h3>Lọc giá</h3>
            <label>
              <input
                type="radio"
                name="price"
                value="all"
                checked={selectedPrice === 'all'}
                onChange={() => setSelectedPrice('all')}
              /> Tất cả
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="0-10000"
                checked={selectedPrice === '0-10000'}
                onChange={() => setSelectedPrice('0-10000')}
              /> Dưới 10.000đ
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="10000-30000"
                checked={selectedPrice === '10000-30000'}
                onChange={() => setSelectedPrice('10000-30000')}
              /> 10k – 30k
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="30000-50000"
                checked={selectedPrice === '30000-50000'}
                onChange={() => setSelectedPrice('30000-50000')}
              /> 30k – 50k
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="50000-100000"
                checked={selectedPrice === '50000-100000'}
                onChange={() => setSelectedPrice('50000-100000')}
              /> 50k – 100k
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="100000-200000"
                checked={selectedPrice === '100000-200000'}
                onChange={() => setSelectedPrice('100000-200000')}
              /> 100k – 200k
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="200000-999999999"
                checked={selectedPrice === '200000-999999999'}
                onChange={() => setSelectedPrice('200000-999999999')}
              /> Trên 200k
            </label>
          </div>
        </aside>

        {/* Content */}
        <main className="product-content">
          <div className="product-banner">

            <img src="./public/assets/banner_productList.png" alt="Banner" />
          </div>

          <div className="product-header">
            <h2>CPU</h2>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img src={product.img_url} alt={product.name} />
                <p className="product-brand">{product.slug}</p>
                <h4 className="product-name">{product.name}</h4>
                <span className="discount">{formatCurrency(product.price)}</span>
                <button
                  className="add-to-cart"
                  onClick={() =>
                    addToCart({
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      img_url: product.img_url,
                    })
                  }
                >
                  <FaShoppingCart /> Thêm vào giỏ
                </button>
              </div>
            ))}

            <img src="/assets/banner_productList.png" alt="Banner" />
          </div>

          <div className="product-header">
            <h2>
              {
                selectedCategory === 'all'
                  ? 'Sản phẩm'
                  : categories.find((c) => c._id === selectedCategory)?.name || 'Sản phẩm'
              }
            </h2>
          </div>

          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="product-card" key={product._id}>
                  {/* Bọc riêng ảnh trong click */}
                  <img
  src={product.img_url}
  alt={product.name}
  style={{ cursor: 'pointer' }}
  onClick={() => {
    // Lưu filter + scroll vào sessionStorage
    sessionStorage.setItem('productFilters', JSON.stringify({
      category: selectedCategory,
      brand: selectedBrand,
      price: selectedPrice,
      scroll: window.scrollY,
    }));

    navigate(`/product/${product._id}`);
  }}
/>

                  <p className="product-brand">{product.slug}</p>
                  <h4 className="product-name">{product.name}</h4>
                  <div className="price-block">
                    <span className="discount">{formatCurrency(product.price)}</span>
                  </div>
                  <button className="add-to-cart">
                    <FaShoppingCart /> Thêm vào giỏ
                  </button>
                </div>
              ))
            ) : (
              <p>Không có sản phẩm phù hợp.</p>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListPage;
