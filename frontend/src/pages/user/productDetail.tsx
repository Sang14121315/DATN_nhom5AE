import React from 'react';
import { FaShoppingCart, FaFacebook, FaFacebookMessenger, FaPinterest } from 'react-icons/fa';
import { AiFillTwitterCircle } from "react-icons/ai";
import { staticProducts } from '@/data/products';
import '@/styles/pages/user/productDetail.scss';

const ProductDetail: React.FC = () => {
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);

  const relatedProducts = staticProducts.filter(product => product.category === 'intel');
  return (
    <div className="product-detail-container">
      <div className="product-container">
        <div className="image-section">
          <span className="discount-badge">-34% OFF</span>
          <img
            className="product-image"
            src="./public/img/sp1.png"
            alt="CPU Intel Core i5-10400F"
          />
        </div>

        <div className="info-section">
          <h1 className="product-name">
            CPU Intel Core i5-10400F - TRAY NEW (3.4GHz turbo up to 4.4GHz, 6 nhân 12 luồng, 12MB Cache, 65W)
          </h1>

          <div className="rating-brand">
            <div className="brand">
              Thương hiệu: <strong>Intel</strong>
            </div>
            <div className="availability">Tình trạng: <strong>Còn hàng</strong></div>
          </div>

          <div className="price-section">
            <div className="discount-price">1,980,000₫</div>
            <div className="original-price">2,990,000₫</div>
            <div className="discount-percent">-34%</div>
          </div>

          <div className="quantity-section">
            <label htmlFor="quantity">Số lượng:</label>
            <div className="quantity-input">
              <button>-</button>
              <input type="number" defaultValue={1} min={1} />
              <button>+</button>
            </div>
          </div>

          <div className="cta">
            <button className="add-to-cart">THÊM VÀO GIỎ</button>
            <button className="buy-now">MUA NGAY</button>
          </div>

          <div className="share">
            <span>Chia sẻ:</span>
            <div className="icons">
              <i className="fab fa-facebook"><FaFacebook /></i>
              <i className="fab fa-messenger"><FaFacebookMessenger /></i>
              <i className="fab fa-twitter"> <AiFillTwitterCircle /></i>
              <i className="fab fa-pinterest"><FaPinterest /></i>
            </div>
          </div>
        </div>

        <div className="side-policy">
          <div className="policy-box">
            <div className='chinh-sach'>
                <h5>Chính sách bán hàng</h5>
                <p>Cam kết 100% chính hãng</p>
                <p>Hỗ trợ 24/7</p>
            </div>
            <div className='chinh-sach'>
                <h5>Thông tin thêm</h5>
                <p>Hoàn tiền 200% nếu hàng giả</p>
                <p>Mở hộp kiểm tra nhận hàng</p>
                <p>Đổi trả trong 7 ngày</p>
            </div>
            
          </div>
          <img src="./public/assets/banner_sale_productList.png" alt="Sale Banner" className="side-banner" />
        </div>
      </div>

      <div className="description-box">
        <h3>MÔ TẢ SẢN PHẨM</h3>
        <ul>
          <li>6 nhân & 12 luồng</li>
          <li>Xung nhịp: 3.4GHz (cơ bản) / 4.4GHz (Boost)</li>
          <li>Socket: LGA1200</li>
          <li>Đã kiểm soát nhiệt từ hãng</li>
          <li>Không tích hợp sẵn iGPU</li>
          <li>Bảo hành: 36 Tháng</li>
        </ul>
      </div>

      <div className="related-products">
        <h2>Sản phẩm liên quan</h2>
        <div className="product-grid">
                    {relatedProducts.map((product) => (
                      <div className="product-card" key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <p className="product-brand">INTEL</p>
                        <h4 className="product-name">{product.name}</h4>
                        {/* <p className="product-description">{product.shortDescription}</p> */}
                        <div className="price-block">
                          {product.discountPrice && (
                            <>
                              <span className="discount">{formatCurrency(product.discountPrice)}</span>
                              <span className="original">{formatCurrency(product.price)}</span>
                            </>
                          )}
                          {!product.discountPrice && (
                            <span className="discount">{formatCurrency(product.price)}</span>
                          )}
                        </div>
                        <button className="add-to-cart">
                          <FaShoppingCart /> Thêm vào giỏ
                        </button>
                      </div>
                    ))}
                  </div>
      </div>

      <div className="related-products">
        <h2>Sản phẩm đã xem</h2>
        <div className="product-grid">
                    {relatedProducts.map((product) => (
                      <div className="product-card" key={product.id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <p className="product-brand">INTEL</p>
                        <h4 className="product-name">{product.name}</h4>
                        {/* <p className="product-description">{product.shortDescription}</p> */}
                        <div className="price-block">
                          {product.discountPrice && (
                            <>
                              <span className="discount">{formatCurrency(product.discountPrice)}</span>
                              <span className="original">{formatCurrency(product.price)}</span>
                            </>
                          )}
                          {!product.discountPrice && (
                            <span className="discount">{formatCurrency(product.price)}</span>
                          )}
                        </div>
                        <button className="add-to-cart">
                          <FaShoppingCart /> Thêm vào giỏ
                        </button>
                      </div>
                    ))}
                  </div>
      </div>
    </div>
  );
};

export default ProductDetail;
