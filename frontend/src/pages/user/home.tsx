import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/api/productAPI";
import "@/styles/pages/user/home.scss";

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
  }, []);

  return (
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