import React, { useEffect, useState } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchAllBrands } from '@/api/brandAPI';
import { Brand } from '@/types';
import '@/styles/pages/admin/brandTable.scss';

const BrandTable: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchAllBrands();
        setBrands(data);
      } catch (err) {
        console.error('Lỗi khi tải thương hiệu:', err);
      }
    };

    loadBrands();
  }, []);

  const paginated = brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(brands.length / itemsPerPage);

  // Hàm xử lý URL ảnh
  const getLogoUrl = (logo_url?: string): string => {
    if (!logo_url) return '';
    // Nếu là URL bắt đầu bằng http hoặc https thì dùng luôn
    if (logo_url.startsWith('http')) return logo_url;
    // Nếu là tên file (ảnh đã upload lên backend), thì thêm đường dẫn server
    return `http://localhost:5000/uploads/brands/${logo_url}`;
  };

  return (
    <div className="category-page-container">
      <h2 className="page-title">Thương hiệu</h2>

      <div className="top-controls">
        <div className="left-filters">
          <button className="filter-button">Thương hiệu</button>
          <button className="filter-button">Ngày</button>
        </div>
        <div className="right-controls">
          <input type="text" placeholder="Tìm kiếm thương hiệu..." />
          <button className="add-button" onClick={() => navigate('/admin/brand/create')}>
            <FaPlus /> Thêm thương hiệu
          </button>
        </div>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Thương hiệu</th>
            <th>Logo</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((brand, index) => (
            <tr key={brand._id}>
              <td>
                <span className="id-link">
                  #{(currentPage - 1) * itemsPerPage + index + 1}
                </span>
              </td>
              <td>{brand.name}</td>
              <td>
                {brand.logo_url ? (
                  <img
                    src={getLogoUrl(brand.logo_url)}
                    alt={brand.name}
                    style={{ width: 80, height: 40, objectFit: 'contain' }}
                  />
                ) : (
                  <span>Không có</span>
                )}
              </td>
              <td>
                {brand.created_at
                  ? new Date(brand.created_at).toLocaleDateString('vi-VN')
                  : ''}
              </td>
              <td>
                <span className="status">Đã duyệt</span>
              </td>
              <td>
                <button
                  className="view-button"
                  onClick={() => navigate(`/admin/brand/${brand._id}/form`)}
                >
                  <FaEye /> Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandTable;
