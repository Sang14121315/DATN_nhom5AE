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
          <button className="add-button" onClick={() => navigate('/admin/brands/create')}>
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
              <td className="brand-logo">{brand.name}</td>
              <td>
                <img 
                  src={brand.logo_url || '/no-image.png'}
                  alt={brand.name}
                  style={{ width: 100, height: 50 }}
                />
              </td>
              <td>{new Date(brand.created_at).toLocaleDateString('vi-VN')}</td>
              <td>
                <span className="status">Đã duyệt</span>
              </td>
              <td>
                <button
                  className="view-button"
                  onClick={() => navigate(`/admin/brands/${brand._id}`)}
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
