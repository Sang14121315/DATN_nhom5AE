import React, { useState } from 'react';

import { FaShoppingCart, FaFacebook, FaFacebookMessenger, FaPinterest } from 'react-icons/fa';
import { AiFillTwitterCircle } from "react-icons/ai";
import productsData from '@/data/laptop.products.json';
import '@/styles/pages/user/productDetail.scss';

const ProductDetail: React.FC = () => {
  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  const [quantity, setQuantity] = useState(1);

  // TODO: Sau này lấy productId từ route param
  const currentProduct = productsData[0];
  const relatedProducts = productsData.filter(
    (product) => product.category_id === currentProduct.category_id && product._id !== currentProduct._id
  );

  return (
    <div className="product-detail-container">
      <div className="product-container">
        <div className="image-section">
          {currentProduct.sale && <span className="discount-badge">-34% OFF</span>}
          <img
            className="product-image"
            src={currentProduct.img_url}
            alt={currentProduct.name}
          />
        </div>

        <div className="info-section">
          <h1 className="product-name">{currentProduct.name}</h1>

          <div className="rating-brand">
            <div className="brand">
              Thương hiệu: <strong>{currentProduct.slug}</strong>
            </div>
            <div className="availability">Tình trạng: <strong>{currentProduct.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</strong></div>
          </div>

          <div className="price-section">
            {currentProduct.sale ? (
              <>
                <div className="discount-price">{formatCurrency(currentProduct.price * 0.66)}</div>
                <div className="original-price">{formatCurrency(currentProduct.price)}</div>
                <div className="discount-percent">-34%</div>
              </>
            ) : (
              <div className="discount-price">{formatCurrency(currentProduct.price)}</div>
            )}
          </div>

          <div className="quantity-section">
  <label htmlFor="quantity">Số lượng:</label>
  <div className="quantity-input">
    <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
    <input
      type="number"
      value={quantity}
      min={1}
      onChange={(e) => {
        const val = parseInt(e.target.value);
        if (!isNaN(val) && val >= 1) {
          setQuantity(val);
        }
      }}
    />
    <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
  </div>
</div>



          <div className="cta">
            <button className="add-to-cart">THÊM VÀO GIỎ</button>
            <button className="buy-now">MUA NGAY</button>
          </div>

          <div className="share">
            <span>Chia sẻ:</span>
            <div className="icons">
              <FaFacebook />
              <FaFacebookMessenger />
              <AiFillTwitterCircle />
              <FaPinterest />
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
        <p>{currentProduct.description}</p>
      </div>

      <div className="related-products">
  <h2>Sản phẩm liên quan</h2>
  <div className="product-grid">
    {relatedProducts.slice(0, 6).map((product) => (
      <div className="product-card" key={product._id}>
        <img src={product.img_url} alt={product.name} />
        <p className="product-brand">{product.slug}</p>
        <h4 className="product-name">{product.name}</h4>
        <div className="price-block">
          {product.sale ? (
            <>
              <span className="discount">{formatCurrency(product.price * 0.66)}</span>
              <span className="original">{formatCurrency(product.price)}</span>
            </>
          ) : (
            <span className="discount">{formatCurrency(product.price)}</span>
          )}
        </div>
        <button className="add-to-cart" >
          <FaShoppingCart /> Thêm vào giỏ
        </button>
      </div>
    ))}
  </div>
</div>


      <div className="related-products">
  <h2>Sản phẩm liên quan</h2>
  <div className="product-grid">
    {relatedProducts.slice(0, 6).map((product) => (
      <div className="product-card" key={product._id}>
        <img src={product.img_url} alt={product.name} />
        <p className="product-brand">{product.slug}</p>
        <h4 className="product-name">{product.name}</h4>
        <div className="price-block">
          {product.sale ? (
            <>
              <span className="discount">{formatCurrency(product.price * 0.66)}</span>
              <span className="original">{formatCurrency(product.price)}</span>
            </>
          ) : (
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
