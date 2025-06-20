'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/pages/user/home.scss';

import { Category, fetchAllCategories } from '../../api/user/categoryAPI';
import { ProductType, fetchAllProductTypes } from '../../api/user/productTypeAPI';
import { Product, fetchAllProducts } from '../../api/user/productAPI';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, types, prods] = await Promise.all([
          fetchAllCategories(),
          fetchAllProductTypes(),
          fetchAllProducts(),
        ]);
        setCategories(cats);
        setProductTypes(types);
        setProducts(prods);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  const featuredProducts = products.filter(p => p.hot);
  const workstationProducts = products.filter(p => {
    const type = productTypes.find(t => t._id === p.product_type_id);
    return type?.name.toLowerCase().includes('workstation');
  });
  const gamingGearProducts = products.filter(p => {
    const type = productTypes.find(t => t._id === p.product_type_id);
    return type?.name.toLowerCase().includes('gaming');
  });

  const renderProductItem = (product: Product) => (
    <div key={product._id} className="product-item">
      <img src={product.img_url || '/images/no-image.png'} alt={product.name} />
      <div className="product-brand">Thương hiệu</div>
      <div className="product-name">{product.name}</div>
      <div>
        <span className="price">{product.price.toLocaleString()}đ</span>
        <span className="discount">-20%</span>
      </div>
      <div className="old-price">{(product.price * 1.2).toLocaleString()}đ</div>
      <button className="add-to-cart">Thêm vào giỏ</button>
    </div>
  );

  return (
    <div>
      <section id="banner">
        <div className="container">
          <div className="menu-left">
            <h3>DANH MỤC SẢN PHẨM</h3>
            <ul>
              {categories.map((cate) => (
                <li key={cate._id}>{cate.name}</li>
              ))}
            </ul>
          </div>
          <div className="content-right">
            <div className="top-banner">
              <img src="/assets/home/banner.jpg" alt="Banner" />
            </div>
          </div>
        </div>
        <div className="bottom-images">
          {[1, 2, 3, 4].map((i) => (
            <img key={i} src="/images/323.webp" alt={`Ảnh ${i}`} />
          ))}
        </div>
      </section>

      <section className="hot-products">
        <h2>Sản phẩm hot</h2>
        <div className="product-list">
          {featuredProducts.map(renderProductItem)}
        </div>
      </section>

      <section className="hot-products">
        <h2>Sản phẩm khuyến mãi</h2>
        <div className="product-list">
          {featuredProducts.map(renderProductItem)}
        </div>
      </section>

      <section id="qc-gh">
        <h2>PC Workstation - 3D Render</h2>
        <div className="workstation-section">
          <div className="left-banner">
            <img src="/images/221213.jpg" alt="3D Render PC Workstation" />
          </div>
          <div className="right-products">
            <div className="filter-buttons">
              <button>Từ 10 đến 20 Triệu</button>
              <button>Trên 20 Triệu</button>
            </div>
            <div className="product-grid">
              {workstationProducts.map((p) => (
                <div key={p._id} className="product-card">
                  <img src={p.img_url || '/images/no-image.png'} alt={p.name} />
                  <h4>{p.name}</h4>
                  <div className="price">{p.price.toLocaleString()}đ</div>
                  <div className="old-price">{(p.price * 1.2).toLocaleString()}đ</div>
                  <div className="discount">-20%</div>
                  <button>Thêm vào giỏ</button>
                </div>
              ))}
            </div>
            <div className="load-more">
              <button>Xem thêm</button>
            </div>
          </div>
        </div>
      </section>

      <section className="gaming-gear-section">
        <h2>GAMING GEAR</h2>
        <div className="gear-list">
          {gamingGearProducts.map((p) => (
            <div key={p._id} className="gear-item">
              <img src={p.img_url || '/images/no-image.png'} alt={p.name} />
              <div className="gear-info">
                <p className="gear-name">{p.name}</p>
                <div className="gear-price">
                  <span className="new-price">{p.price.toLocaleString()}đ</span>
                  <span className="old-price">{(p.price * 1.1).toLocaleString()}đ</span>
                  <span className="discount">-10%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;