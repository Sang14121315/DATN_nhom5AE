
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
   getProductById as fetchProductDetail,
  formatCurrency,
  updateProduct,
  deleteProduct,
  Product,
} from '@/api/productsAPI';
import { fetchAllCategories, Category } from '@/api/categoryAPI';
import { fetchAllBrands, Brand } from '@/api/brandAPI';
import { fetchProductTypes, ProductType } from '@/api/productTypeAPI';
import '@/styles/pages/admin/productDetail.scss';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

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

    // Load danh mục, thương hiệu, loại
    const loadOptions = async () => {
      try {
        const [cat, br, type] = await Promise.all([
          fetchAllCategories({}),
          fetchAllBrands({}),
          fetchProductTypes()
        ]);
        setCategories(cat);
        setBrands(br);
        setProductTypes(type);
      } catch (err) {
        console.error('Lỗi khi tải danh sách phụ:', err);
      }
    };
    loadOptions();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      alert('Đã lưu thay đổi');
      setIsEditing(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      alert('Không thể lưu');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) return;
    try {
      await deleteProduct(id);
      alert('Đã xoá sản phẩm');
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Xoá thất bại');
    }
  };

  if (!product) return <div>Đang tải sản phẩm...</div>;

  return (
    <div className="container">
      <h2>Chi tiết sản phẩm</h2>

      <div className="left">
        <label>Tên sản phẩm</label>
        <input name="name" value={formData.name || ''} onChange={handleChange} readOnly={!isEditing} />

        <label>Mô tả</label>
        <textarea name="description" value={formData.description || ''} onChange={handleChange} readOnly={!isEditing} />

        <div className="two-columns">
          <div>
            <label>Danh mục</label>
            {isEditing ? (
              <select name="category_id" value={formData.category_id || ''} onChange={handleChange}>
                <option value="">— Chọn danh mục —</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            ) : (
              <input value={product.category_id?.name || ''} readOnly />
            )}
          </div>
          <div>
            <label>Thương hiệu</label>
            {isEditing ? (
              <select name="brand_id" value={formData.brand_id || ''} onChange={handleChange}>
                <option value="">— Chọn thương hiệu —</option>
                {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
              </select>
            ) : (
              <input value={product.brand_id?.name || ''} readOnly />
            )}
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Loại</label>
            {isEditing ? (
              <select name="product_type_id" value={formData.product_type_id || ''} onChange={handleChange}>
                <option value="">— Chọn loại sản phẩm —</option>
                {productTypes.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            ) : (
              <input value={product.product_type_id?.name || ''} readOnly />
            )}
          </div>
          <div>
            <label>Giảm giá</label>
            <input type="checkbox" name="sale" checked={formData.sale} onChange={handleChange} disabled={!isEditing} />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Giá</label>
            <input name="price" value={formData.price || ''} onChange={handleChange} readOnly={!isEditing} />
          </div>
          <div>
            <label>Số lượng</label>
            <input name="stock" value={formData.stock || ''} onChange={handleChange} readOnly={!isEditing} />
          </div>
        </div>

        <div className="buttons">
          {!isEditing ? (
            <>
              <button className="update" onClick={() => setIsEditing(true)}>CHỈNH SỬA</button>
              <button className="delete" onClick={handleDelete}>XOÁ</button>
              <button className="back" onClick={() => navigate(-1)}>QUAY LẠI</button>
            </>
          ) : (
            <>
              <button className="update" onClick={handleSubmit}>LƯU</button>
              <button className="back" onClick={() => setIsEditing(false)}>HUỶ</button>
            </>
          )}
        </div>
      </div>

      <div className="right">
        <div className="upload-box">
          <p>Ảnh sản phẩm</p>
          {isEditing && <input type="file" onChange={handleFileChange} />}
        </div>

        {product.img_url && (
          <div className="upload-preview">
            <div className="upload-item">
              <div className="upload-thumb">
                <img src={product.img_url} alt="Ảnh sản phẩm" style={{ width: 40, height: 40 }} />
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

export default ProductDetailPage;