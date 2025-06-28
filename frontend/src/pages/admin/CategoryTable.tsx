import React, { useEffect, useState } from 'react';
import { FaEye, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchAllCategories } from '@/api/categoryAPI';
import { Category } from '@/types';
import '@/styles/pages/admin/categoryTable.scss';

const CategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Lỗi khi tải danh mục:', err);
      }
    };

    loadCategories();
  }, []);

  const paginated = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="category-page-container">
      <h2 className="page-title">Danh mục</h2>

      <div className="top-controls">
        <div className="left-filters">
          <button className="filter-button">Danh mục</button>
          <button className="filter-button">Ngày</button>
        </div>

        <div className="right-controls">
          <input type="text" placeholder="Tìm kiếm danh mục..." />
          <button className="add-button" onClick={() => navigate('/admin/categories/create')}>
            <FaPlus /> Thêm danh mục
          </button>
        </div>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Danh mục</th>
            <th>Mô tả</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((cat, index) => (
            <tr key={cat._id}>
              <td>
                <span className="id-link">#{(currentPage - 1) * itemsPerPage + index + 1}</span>
              </td>
              <td>{cat.name}</td>
              <td>{cat.description?.slice(0, 20)}...</td>
              <td>{new Date(cat.created_at).toLocaleDateString('vi-VN')}</td>
              <td><span className="status">Đã duyệt</span></td>
              <td>
                <button
                  className="view-button"
                  onClick={() => navigate(`/admin/categories/${cat._id}`)}
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

export default CategoryTable;
