// src/pages/admin/AddProductPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Product,
  createProduct
} from '@/api/productsAPI';
import '@/styles/pages/admin/productDetail.scss';

const AddProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Product, '_id' | 'created_at'>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    sale: false,
    hot: false,
    view: 0,
    slug: '',
    img_url: '',
    category_id: '',
    brand_id: '',
    product_type_id: '',
    coupons_id: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleSubmit = async () => {
    try {
      await createProduct(formData);
      alert('Tạo sản phẩm thành công!');
      navigate('/admin/products');
    } catch (err) {
      console.error('Lỗi tạo sản phẩm:', err);
      alert('Tạo thất bại');
    }
  };

  return (
    <div className="container">
      <h2>Thêm sản phẩm mới</h2>

      <div className="left">
        <label>Tên sản phẩm</label>
        <input name="name" value={formData.name} onChange={handleChange} />

        <label>Slug</label>
        <input name="slug" value={formData.slug} onChange={handleChange} />

        <label>Mô tả</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <div className="two-columns">
          <div>
            <label>Danh mục</label>
            <input name="category_id" value={formData.category_id} onChange={handleChange} />
          </div>
          <div>
            <label>Thương hiệu</label>
            <input name="brand_id" value={formData.brand_id} onChange={handleChange} />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Loại</label>
            <input name="product_type_id" value={formData.product_type_id} onChange={handleChange} />
          </div>
          <div>
            <label>Mã giảm giá</label>
            <input name="coupons_id" value={formData.coupons_id} onChange={handleChange} />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Giá</label>
            <input name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <label>Số lượng</label>
            <input name="stock" value={formData.stock} onChange={handleChange} />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Hot</label>
            <input type="checkbox" name="hot" checked={formData.hot} onChange={handleChange} />
          </div>
          <div>
            <label>Giảm giá</label>
            <input type="checkbox" name="sale" checked={formData.sale} onChange={handleChange} />
          </div>
        </div>

        <div className="buttons">
          <button className="update" onClick={handleSubmit}>TẠO</button>
          <button className="back" onClick={() => navigate(-1)}>QUAY LẠI</button>
        </div>
      </div>

      <div className="right">
        <div className="upload-box">
          <p>Ảnh sản phẩm (url)</p>
        </div>
        <div className="upload-preview">
          <input name="img_url" value={formData.img_url} onChange={handleChange} placeholder="Nhập URL ảnh" />
          {formData.img_url && (
            <div className="upload-item">
              <div className="upload-thumb">
                <img src={formData.img_url} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
              </div>
              <div className="progress-bar"><div style={{ width: '100%' }} /></div>
              <span className="checkmark">✔</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
