import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/api/productAPI";
import "@/styles/pages/user/home.scss";

<<<<<<< Updated upstream
const categories = [
  "CPU", "Mainboard", "RAM", "VGA Mới", "SSD/HDD", "Tản nhiệt", "Nguồn",
  "Vỏ Case", "Chuột", "Bàn Phím", "Sạc", "Pin dự phòng", "Tai nghe", "Cáp sạc"
];

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
=======
import React, { useEffect, useState } from 'react';
import '@/styles/pages/user/productList.scss';

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
>>>>>>> Stashed changes
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

  const renderProductCard = (product: Product) => (
    <div key={product._id} className="product-card">
      <img src={product.img_url || '/images/no-image.png'} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.price.toLocaleString()}₫</p>
    </div>
  );

  return (
<<<<<<< Updated upstream
    <div className="homepage">
      <div className="main-banner">
        <aside className="sidebar">
          <h3>DANH MỤC SẢN PHẨM</h3>
          <ul>
            {categories.map((cat, idx) => (
              <li key={idx}>{cat}</li>
            ))}
          </ul>
        </aside>

        <div className="banner-images">
          <img src="src\assets\home\banner.jpg" alt="Main Banner" />
        </div>
      </div>

      {/* DANH MỤC NGANG */}
      <div className="top-category-bar">
        {categories.map((cat, idx) => (
          <span key={idx} className="category-pill">{cat}</span>
        ))}
      </div>

      {/* Sản phẩm hot */}
      <div className="section">
        <h3>Sản phẩm hot</h3>
        <div className="product-grid">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
=======
    <div className="product-page-container">
      <div className="product-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>DANH MỤC SẢN PHẨM</h3>
            <ul>
              {categories.map(cate => (
                <li key={cate._id}>{cate.name}</li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="product-content">
          <div className="product-banner">
            <img src="/images/323.webp" alt="Banner chính" />
          </div>

          <div className="home-bottom-images">
            <img src="/images/323.webp" alt="Ảnh 1" />
            <img src="/images/323.webp" alt="Ảnh 2" />
            <img src="/images/323.webp" alt="Ảnh 3" />
            <img src="/images/323.webp" alt="Ảnh 4" />
          </div>

          <section className="home__section">
            <h2>Sản phẩm nổi bật</h2>
            <div className="home__grid">
              {featuredProducts.map(renderProductCard)}
            </div>
          </section>

          <section className="home__section">
            <h2>Workstation PC</h2>
            <div className="home__grid">
              {workstationProducts.map(renderProductCard)}
            </div>
          </section>

          <section className="home__section">
            <h2>Gaming Gear</h2>
            <div className="home__grid">
              {gamingGearProducts.map(renderProductCard)}
            </div>
          </section>
        </main>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }: any) => (
  <div className="product-card upgraded">
    <img src={product.img_url} alt={product.name} />
    <div className="product-info">
      <div className="brand">{product.brand}</div>
      <div className="name">{product.name}</div>
      <div className="price">{product.price.toLocaleString()}₫</div>
    </div>
    <button className="add-cart" onClick={() => addToCart({ ...product, quantity: 1 })}>
      <FaCartPlus /> THÊM VÀO GIỎ
    </button>
  </div>
);

export default HomePage;