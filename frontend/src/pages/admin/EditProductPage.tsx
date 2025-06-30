import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchProductDetail,
  updateProduct,
  Product
} from '@/api/productsAPI';
import '@/styles/pages/admin/productDetail.scss';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        const data = await fetchProductDetail(id);
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category_id: data.category_id?._id,
          brand_id: data.brand_id?._id,
          product_type_id: data.product_type_id?._id,
          sale: data.sale || false,
        });
      }
    };
    loadProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!id) return;
    const updatedData = new FormData();
    Object.keys(formData).forEach(key => {
      updatedData.append(key, formData[key]);
    });
    if (imageFile) updatedData.append('image', imageFile);

    try {
      await updateProduct(id, updatedData);
      alert('Cập nhật sản phẩm thành công!');
      navigate('/admin/products');
    } catch (error) {
      alert('Lỗi khi cập nhật sản phẩm');
      console.error(error);
    }
  };

  if (!product) return <div>Đang tải sản phẩm...</div>;

  return (
    <div className="container">
      <h2>Chỉnh sửa sản phẩm</h2>

      <div className="left">
        <label>Tên sản phẩm</label>
        <input name="name" value={formData.name || ''} onChange={handleChange} />

        <label>Mô tả</label>
        <textarea name="description" value={formData.description || ''} onChange={handleChange} />

        <div className="two-columns">
          <div>
            <label>Danh mục</label>
            <input name="category_id" value={formData.category_id || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Thương hiệu</label>
            <input name="brand_id" value={formData.brand_id || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Loại</label>
            <input name="product_type_id" value={formData.product_type_id || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Giảm giá</label>
            <input type="checkbox" name="sale" checked={formData.sale} onChange={handleChange} />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Giá</label>
            <input name="price" value={formData.price || ''} onChange={handleChange} />
          </div>
          <div>
            <label>Số lượng</label>
            <input name="stock" value={formData.stock || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="buttons">
          <button className="update" onClick={handleSubmit}>LƯU</button>
          <button className="back" onClick={() => navigate(-1)}>QUAY LẠI</button>
        </div>
      </div>

      <div className="right">
        <div className="upload-box">
          <p>Ảnh sản phẩm</p>
          <input type="file" onChange={handleFileChange} />
        </div>

        {product.img_url && (
          <div className="upload-preview">
            <div className="upload-item">
              <div className="upload-thumb">
                <img src={product.img_url} alt="Ảnh sản phẩm" style={{ width: 40, height: 40, borderRadius: 6 }} />
              </div>
              <div className="progress-bar"><div style={{ width: '100%' }} /></div>
              <span className="checkmark">✔</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
