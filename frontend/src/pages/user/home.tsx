'use client';

import React, { useEffect, useState } from 'react';
import '@/styles/pages/user/productList.scss'; // dùng chung stylesheet nếu cần

import { ProductType, fetchAllProductTypes } from '../../api/user/productTypeAPI';
import { Category, fetchAllCategories } from '../../api/user/categoryAPI';

const HomePage: React.FC = () => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [types, cats] = await Promise.all([
          fetchAllProductTypes(),
          fetchAllCategories(),
        ]);
        setProductTypes(types);
        setCategories(cats);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="product-page-container">
      <div className="product-layout">
        {/* Sidebar bên trái */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>DANH MỤC SẢN PHẨM</h3>
            <ul>
              {categories.map((cate) => (
                <li key={cate._id}>{cate.name}</li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Nội dung chính bên phải */}
        <main className="product-content">
          {/* Banner */}
          <div className="product-banner">
            <img src="/images/323.webp" alt="Banner chính" />
          </div>

          {/* Ảnh dưới banner */}
          <div className="home-bottom-images">
            <img src="/images/323.webp" alt="Ảnh 1" />
            <img src="/images/323.webp" alt="Ảnh 2" />
            <img src="/images/323.webp" alt="Ảnh 3" />
            <img src="/images/323.webp" alt="Ảnh 4" />
          </div>

          {/* Các khối sản phẩm nổi bật */}
          <section className="home__section">
            <h2>Sản phẩm nổi bật</h2>
            <div className="home__grid">
              {/* TODO: render sản phẩm nổi bật */}
            </div>
          </section>

          <section className="home__section">
            <h2>Workstation PC</h2>
            <div className="home__grid">
              {/* TODO: render PC */}
            </div>
          </section>

          <section className="home__section">
            <h2>Gaming Gear</h2>
            <div className="home__grid">
              {/* TODO: render Gaming Gear */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
