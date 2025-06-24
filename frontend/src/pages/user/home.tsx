'use client';

import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { Category, fetchAllCategories } from "@/api/user/categoryAPI";
import { ProductType, fetchAllProductTypes } from "@/api/user/productTypeAPI";
import { Product, fetchAllProducts } from "@/api/user/productAPI";
import "@/styles/pages/user/home.scss";

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

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
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const featuredProducts = products.filter(p => p.hot).slice(0, 4);
  const workstationProducts = products.filter(p => p.hot).slice(0, 10);
  const gamingGearProducts = products.filter(p => p.hot).slice(0, 10);

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
      <button className="add-to-cart" onClick={() => addToCart({ ...product, quantity: 1 })}>
        Thêm vào giỏ
      </button>
    </div>
  );

  return (
    <div>
      {/* Banner */}
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
            <div className="top-menu">
              <div className="menu-item"><span>🛡️</span> Chất lượng đảm bảo</div>
              <div className="menu-item"><span>🚛</span> Vận chuyển siêu nhanh</div>
              <div className="menu-item"><span>📞</span> Tư vấn PC</div>
              <div className="menu-item"><span>✉️</span> Liên hệ</div>
            </div>
            <div className="top-banner">
              <img src="/img/anh2.jpg" alt="Banner" />
            </div>
          </div>
        </div>
        <div className="bottom-images">
          {["anh2.jpg", "banner 1.webp", "slide_1_img.webp", "slide_3_img.jpg"].map((file, i) => (
            <img key={i} src={`/img/${file}`} alt={`Ảnh ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Sản phẩm hot */}
      <section className="hot-products">
        <h2>Sản phẩm hot</h2>
        <div className="product-list">
          {featuredProducts.map(renderProductItem)}
        </div>
      </section>

      {/* Khuyến mãi */}
      <section className="km-products">
        <h2>Sản phẩm khuyến mãi</h2>
        <div className="product-list">
          {featuredProducts.map(renderProductItem)}
        </div>
      </section>

      {/* PC Workstation - 3D Render */}
      <section id="qc-gh">
        <div className="wrapper">
          <h2>PC Workstation - 3D Render</h2>
          <div className="workstation-section">
            <div className="left-banner">
              <img src="/img/bannerphu.jpg" alt="3D Render PC Workstation" />
            </div>
            <div className="right-products">
              <div className="filter-buttons">
                <button>Từ 10 đến 20 Triệu</button>
                <button>Trên 20 Triệu</button>
              </div>
              <div className="product-grid">
                {workstationProducts.map(renderProductItem)}
              </div>
              <div className="load-more">
                <button>Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linh Kiện Nâng Cấp */}
      <section id="qc-gh">
        <div className="wrapper">
          <h2>Linh Kiện Nâng Cấp</h2>
          <div className="workstation-section">
            <div className="left-banner">
              <img src="/img/p2.webp" alt="Linh Kiện Nâng Cấp" />
            </div>
            <div className="right-products">
              <div className="filter-buttons">
                <button>Từ 10 đến 20 Triệu</button>
                <button>Trên 20 Triệu</button>
              </div>
              <div className="product-grid">
                {workstationProducts.map(renderProductItem)}
              </div>
              <div className="load-more">
                <button>Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Linh kiện máy tính */}
      <section id="qc-gh">
        <div className="wrapper">
          <h2>Linh kiện máy tính</h2>
          <div className="workstation-section">
            <div className="left-banner">
              <img src="/img/p3.webp" alt="Linh kiện máy tính" />
            </div>
            <div className="right-products">
              <div className="filter-buttons">
                <button>Từ 10 đến 20 Triệu</button>
                <button>Trên 20 Triệu</button>
              </div>
              <div className="product-grid">
                {workstationProducts.map(renderProductItem)}
              </div>
              <div className="load-more">
                <button>Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PC Gaming */}
      <section id="qc-gh">
        <div className="wrapper">
          <h2>PC Gaming Hiệu Năng Cao</h2>
          <div className="workstation-section">
            <div className="left-banner">
              <img src="/img/p4.jpg" alt="PC Gaming Hiệu Năng Cao" />
            </div>
            <div className="right-products">
              <div className="filter-buttons">
                <button>Từ 10 đến 20 Triệu</button>
                <button>Trên 20 Triệu</button>
              </div>
              <div className="product-grid">
                {workstationProducts.map(renderProductItem)}
              </div>
              <div className="load-more">
                <button>Xem thêm</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gaming gear */}
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
                <button onClick={() => addToCart({ ...p, quantity: 1 })}>
                  <FaCartPlus /> Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
