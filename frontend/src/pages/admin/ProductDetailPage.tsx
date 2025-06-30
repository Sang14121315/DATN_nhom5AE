import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetail, formatCurrency, Product, deleteProduct } from '@/api/productsAPI';
import '@/styles/pages/admin/productDetail.scss';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (id) {
          const data = await fetchProductDetail(id);
          setProduct(data);
        }
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      }
    };
    loadProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirm = window.confirm('Bạn có chắc muốn xóa sản phẩm này không?');
    if (!confirm) return;
    try {
      await deleteProduct(id);
      alert('Xóa thành công');
      navigate('/admin/products');
    } catch (err) {
      alert('Xóa thất bại');
      console.error(err);
    }
  };

  const handleUpdate = () => {
    navigate(`/admin/products/edit/${product?._id}`);
  };

  if (!product) return <div>Đang tải chi tiết sản phẩm...</div>;

  return (
    <div className="container">
      <h2>Chi tiết sản phẩm</h2>

      <div className="left">
        <label>Tên sản phẩm</label>
        <input type="text" value={product.name} readOnly />

        <label>Mô tả</label>
        <textarea value={product.description} readOnly />

        <div className="two-columns">
          <div>
            <label>Category</label>
            <input type="text" value={product.category_id?.name || ''} readOnly />
          </div>
          <div>
            <label>Thương hiệu</label>
            <input type="text" value={product.brand_id?.name || ''} readOnly />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Ngày</label>
            <input type="text" value={product.created_at?.slice(0, 10).split('-').reverse().join('-')} readOnly />
          </div>
          <div>
            <label>Loại</label>
            <input type="text" value={product.product_type_id?.name || ''} readOnly />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Giá gốc</label>
            <input type="text" value={formatCurrency(product.price)} readOnly />
          </div>
          <div>
            <label>Giảm giá</label>
            <input type="text" value={product.sale ? 'Có' : 'Không'} readOnly />
          </div>
        </div>

        <div className="two-columns">
          <div>
            <label>Số lượng</label>
            <input type="text" value={String(product.stock)} readOnly />
          </div>
          <div>
            <label>Tình trạng</label>
            <input type="text" value="Đã duyệt" readOnly />
          </div>
        </div>

        <div className="buttons">
          <button className="update" onClick={handleUpdate}>CẬP NHẬT</button>
          <button className="delete" onClick={handleDelete}>XÓA</button>
          <button className="back" onClick={() => navigate(-1)}>QUAY LẠI</button>
        </div>
      </div>

      <div className="right">
        <div className="upload-box">
          <p>Ảnh sản phẩm</p>
          <button disabled>Thêm ảnh</button>
        </div>

        <div className="upload-preview">
          {product.img_url && (
            <div className="upload-item">
              <div className="upload-thumb">
                <img src={product.img_url} alt="Ảnh sản phẩm" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
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

export default ProductDetailPage;
