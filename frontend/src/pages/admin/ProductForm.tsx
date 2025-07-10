import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductById,
  updateProduct,
  createProduct,
  deleteProduct,
} from '@/api/productsAPI';
import { fetchAllCategories } from '@/api/categoryAPI';
import { fetchAllBrands } from '@/api/brandAPI';
import { fetchProductTypes } from '@/api/productTypeAPI';
import '@/styles/pages/admin/productDetail.scss';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  const [product, setProduct] = useState<any>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category_id: '',
    brand_id: '',
    product_type_id: '',
    sale: false,
    created_at: '',
    status: 'Đã duyệt',
  });

  useEffect(() => {
    const fetchData = async () => {
      const [cats, brs, tys] = await Promise.all([
        fetchAllCategories({}),
        fetchAllBrands({}),
        fetchProductTypes(),
      ]);
      setCategories(cats);
      setBrands(brs);
      setTypes(tys);
    };

    fetchData();

    if (isEditMode && id) {
      getProductById(id).then((res) => {
        setProduct({
          name: res.name || '',
          description: res.description || '',
          price: res.price || 0,
          stock: res.stock || 0,
          category_id: res.category_id?._id || '',
          brand_id: res.brand_id?._id || '',
          product_type_id: res.product_type_id?._id || '',
          sale: res.sale || false,
          created_at: res.created_at || '',
          status: 'Đã duyệt',
        });
        setImagePreview(res.img_url || null);
      });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    if (imageFile) formData.append('image', imageFile);

    try {
      if (isEditMode && id) {
        await updateProduct(id, formData);
        alert('Cập nhật sản phẩm thành công!');
      } else {
        await createProduct(formData);
        alert('Thêm sản phẩm mới thành công!');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error(error);
      alert('Thao tác thất bại!');
    }
  };

  const handleDelete = async () => {
    if (!isEditMode || !id) return;
    if (!window.confirm('Bạn chắc chắn muốn xoá sản phẩm?')) return;
    try {
      await deleteProduct(id);
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Xoá thất bại!');
    }
  };

  return (
    <div className="container">
      <h2>Chi tiết sản phẩm</h2>
      <div className="left">
        <label>Tên sản phẩm</label>
        <input name="name" value={product.name} onChange={handleInputChange} />

        <label>Mô tả</label>
        <textarea name="description" value={product.description} onChange={handleInputChange} />

        <div className="two-columns">
          <div>
            <label>Category</label>
            <select name="category_id" value={product.category_id} onChange={handleInputChange}>
              <option value="">-- chọn --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Thương hiệu</label>
            <select name="brand_id" value={product.brand_id} onChange={handleInputChange}>
              <option value="">-- chọn --</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Ngày</label>
            <input value={new Date(product.created_at).toLocaleDateString('vi-VN')} disabled />
          </div>
          <div>
            <label>Loại</label>
            <select name="product_type_id" value={product.product_type_id} onChange={handleInputChange}>
              <option value="">-- chọn --</option>
              {types.map((t) => (
                <option key={t._id} value={t._id}>{t.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Giá gốc</label>
            <input type="number" name="price" value={product.price} onChange={handleInputChange} />
          </div>
          <div>
            <label>Giảm giá</label>
            <input type="text" value={product.sale ? 'Có' : '0'} readOnly />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Số lượng</label>
            <input type="number" name="stock" value={product.stock} onChange={handleInputChange} />
          </div>
          <div>
            <label>Tình trạng</label>
            <input type="text" value={product.status} readOnly />
          </div>
        </div>

        <div className="buttons">
          <button className="update" onClick={handleSubmit}>CẬP NHẬT</button>
          {isEditMode && <button className="delete" onClick={handleDelete}>XÓA</button>}
          <button className="back" onClick={() => navigate(-1)}>QUAY LẠI</button>
        </div>
      </div>

      <div className="right">
        <div className="upload-box">
          <p>Ảnh, video.....</p>
          <label>
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            <button>Thêm ảnh</button>
          </label>
        </div>

        <div className="upload-preview">
          {imagePreview && (
            <div className="upload-item">
              <div className="upload-thumb">
                <img src={imagePreview} alt="preview" />
              </div>
              <div className="progress-bar"><div style={{ width: '100%' }}></div></div>
              <span className="checkmark">✔</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
