'use client';

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
      </div>
    </div>
  );
};

export default HomePage;