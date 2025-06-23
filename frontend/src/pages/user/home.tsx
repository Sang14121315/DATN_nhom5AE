
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

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchAllProducts().then(setProducts).catch(console.error);

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
            <div className="top-menu">
  <div className="menu-item">
    <span>🛡️</span>
    <span>Chất lượng đảm bảo</span>
  </div>
  <div className="menu-item">
    <span>🚛</span>
    <span>Vận chuyển siêu nhanh</span>
  </div>
  <div className="menu-item">
    <span>📞</span>
    <span>Tư vấn PC</span>
  </div>
  <div className="menu-item">
    <span>✉️</span>
    <span>Liên hệ</span>
  </div>
</div>
            <div className="top-banner">
              <img src="/img/anh2.jpg" alt="Banner" />
            </div>
          </div>
        </div>
        <div className="bottom-images">
  {[
    "anh2.jpg",
    "banner 1.webp",
    "slide_1_img.webp",
    "slide_3_img.jpg",
  ].map((filename, i) => (
    <img key={i} src={`/img/${filename}`} alt={`Ảnh ${i + 1}`} />
  ))}
</div>
      </section>

      <section className="hot-products">
        <h2>Sản phẩm hot</h2>
        <div className="product-list">
          {featuredProducts.map(renderProductItem)}
        </div>
      </section>

      <section className="km-products">
        <h2>Sản phẩm khuyến mãi</h2>
        <div className="product-list">
          {featuredProducts.map(renderProductItem)}
        </div>
      </section>

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
          <img src="../../../assets/home/banner.jpg" alt="Main Banner" />

        </div>
      </div>
    </div>
  </div>
</section>

 <section id="qc-gh">
  <div className="wrapper">
    <h2>Linh Kiện Nâng Cấp</h2>
    <div className="workstation-section">
      <div className="left-banner">
        <img src="/img/p2.webp" alt="3D Render PC Workstation" />
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
  </div>
</section>

 <section id="qc-gh">
  <div className="wrapper">
    <h2>Linh kiện máy tính</h2>
    <div className="workstation-section">
      <div className="left-banner">
        <img src="/img/p3.webp" alt="3D Render PC Workstation" />
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

          {products.filter(p => p.hot).map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />

          ))}
        </div>
        <div className="load-more">
          <button>Xem thêm</button>
        </div>
      </div>
    </div>
  </div>
</section>


 <section id="qc-gh">
  <div className="wrapper">
    <h2>PC Gaming Hiệu Năng Cao</h2>
    <div className="workstation-section">
      <div className="left-banner">
        <img src="/img/p4.jpg" alt="3D Render PC Workstation" />
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

interface ProductCardProps {
  product: Product;
  addToCart: (item: Product & { quantity: number }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  return (
    <div className="product-card upgraded">
      <img src={product.img_url} alt={product.name} />
      <div className="product-info">
        <div className="brand">
          {typeof product.brand_id === "object" ? product.brand_id.name : product.brand_id}
        </div>
        <div className="name">{product.name}</div>
        <div className="price">{formatCurrency(product.price)}</div>
      </div>
      <button className="add-cart" onClick={() => addToCart({ ...product, quantity: 1 })}>
        <FaCartPlus /> THÊM VÀO GIỎ
      </button>
    </div>

  );
};

export default HomePage;
