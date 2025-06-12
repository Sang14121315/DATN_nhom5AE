import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import "../../styles/pages/user/home.scss";

const categories = ["CPU", "Mainboard", "Ram", "VGA Mới", "SSD/HDD", "Tản nhiệt", "Nguồn (PSU)", "Vỏ Case"];
const suppliers = ["Intel", "AMD"];
const priceRanges = [
  "Dưới 5.000.000đ",
  "5.000.000đ - 10.000.000đ",
  "10.000.000đ - 15.000.000đ",
  "15.000.000đ - 20.000.000đ",
  "Trên 20.000.000đ",
];

const products = new Array(8).fill({
  brand: "INTEL",
  name: "CPU INTEL CORE i5-10400f - TRAY NEW",
  price: "1,980,000đ",
  oldPrice: "2,990,000đ",
  discount: "34%",
  image: "/cpu.png"
});

const Home: React.FC = () => {
  return (
    <div className="homepage-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="section-header">
            <span>Danh mục sản phẩm</span>
            <FaChevronDown />
          </div>
          <ul>
            {categories.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="section-header">
            <span>Nhà cung cấp</span>
            <FaChevronDown />
          </div>
          {suppliers.map((s, i) => (
            <div key={i} className="checkbox-row">
              <input type="checkbox" />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div>
          <div className="section-header">
            <span>Lọc giá</span>
            <FaChevronDown />
          </div>
          {priceRanges.map((p, i) => (
            <div key={i} className="checkbox-row">
              <input type="checkbox" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <img src="/intel-banner.jpg" alt="banner" className="banner" />

        <h2 className="section-title">
          CPU <span>81 sản phẩm</span>
        </h2>

        <div className="product-grid">
          {products.map((prod, i) => (
            <div key={i} className="product-card">
              <img src={prod.image} alt={prod.name} />
              <div className="brand">{prod.brand}</div>
              <div className="name">{prod.name}</div>
              <div className="price">{prod.price}</div>
              <div className="old-price">{prod.oldPrice}</div>
              <div className="discount">-{prod.discount}</div>
              <button className="add-to-cart">Thêm vào giỏ</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
