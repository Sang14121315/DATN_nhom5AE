
import "../../styles/pages/user/home.scss";
import { FaCartPlus } from "react-icons/fa";

const categories = [
  "CPU", "Mainboard", "RAM", "VGA Mới", "SSD/HDD", "Tản nhiệt", "Nguồn",
  "Vỏ Case", "Cân nặng", "Chuột", "Bàn Phím", "Cục sạc", "Pin dự phòng", "Tai nghe", "Dây sạc"
];

const products = new Array(6).fill({
  brand: "NVIDIA",
  name: "CPU INTEL CORE I5-10400F - TRAY NEW",
  price: "1,580,000đ",
  oldPrice: "2,690,000đ",
  discount: "34%",
  image: "../../src/assets/home/pc.jpg"
});

const HomePage = () => {
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
          <img src="../../src/assets/home/banner.jpg" alt="Main Banner" />
        </div>
      </div>

      <div className="section">
        <h3>Sản phẩm hot</h3>
        <div className="product-grid">
          {products.map((item, idx) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Sản phẩm bán chạy</h3>
        <div className="product-grid">
          {products.map((item, idx) => (
            <ProductCard key={idx} product={item} />
          ))}
        </div>
      </div>

      <div className="section high-end">
        <div className="left-ad">
          <img src="../../src/assets/home/bannerphu.jpg" alt="Khủng long" />
          <button className="btn-hotline">XEM NGAY</button>
        </div>
        <div className="right-list">
          <div className="filter-btns">
            <button>Từ 10 đến 20 Triệu</button>
            <button>Trên 20 Triệu</button>
          </div>
          <div className="product-grid">
            {products.map((item, idx) => (
              <ProductCard key={idx} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: any) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="brand">{product.brand}</div>
      <div className="name">{product.name}</div>
      <div className="price">{product.price}</div>
      <div className="old-price">{product.oldPrice}</div>
      <div className="discount">{product.discount}</div>
      <button className="add-cart"><FaCartPlus /> THÊM VÀO GIỎ</button>
    </div>
  );
};

export default HomePage;
