import React, { useEffect, useState } from "react";
import {
  fetchCoupons,
  createCouponAPI,
  updateCouponAPI,
  deleteCouponAPI,
} from "@/api/couponAPI";
import "@/styles/pages/admin/couponPage.scss";

const defaultForm = {
  code: "",
  discount_type: "percentage",
  discount_value: 0,
  min_order_value: 0,
  start_date: "",
  end_date: "",
  max_uses: 1,
  is_active: true,
};

const AdminCouponPage: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    code: "",
    discount_type: "",
    status: "",
    date_from: "",
    date_to: "",
  });

  const loadCoupons = async () => {
    const data = await fetchCoupons();
    setCoupons(data);
    setFilteredCoupons(data);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...coupons];

    // Filter by code
    if (filters.code) {
      filtered = filtered.filter(coupon =>
        coupon.code.toLowerCase().includes(filters.code.toLowerCase())
      );
    }

    // Filter by discount type
    if (filters.discount_type) {
      filtered = filtered.filter(coupon =>
        coupon.discount_type === filters.discount_type
      );
    }

    // Filter by status
    if (filters.status !== "") {
      const isActive = filters.status === "active";
      filtered = filtered.filter(coupon => coupon.is_active === isActive);
    }

    // Filter by date range
    if (filters.date_from) {
      filtered = filtered.filter(coupon =>
        new Date(coupon.start_date) >= new Date(filters.date_from)
      );
    }

    if (filters.date_to) {
      filtered = filtered.filter(coupon =>
        new Date(coupon.end_date) <= new Date(filters.date_to)
      );
    }

    setFilteredCoupons(filtered);
  }, [coupons, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      code: "",
      discount_type: "",
      status: "",
      date_from: "",
      date_to: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const payload = {
      ...formData,
      discount_value: Number(formData.discount_value),
      min_order_value: Number(formData.min_order_value),
      max_uses: Number(formData.max_uses),
      start_date: new Date(formData.start_date).toISOString(),
      end_date: new Date(formData.end_date).toISOString(),
    };

    if (editingId) {
      await updateCouponAPI(editingId, payload);
    } else {
      const newCoupon = await createCouponAPI(payload);
      setCoupons((prev: any[]) => [newCoupon, ...prev]);
    }

    setFormData(defaultForm);
    setEditingId(null);
    await loadCoupons();
  } catch (err: any) {
    console.error("❌ Lỗi khi lưu mã giảm giá:", err);
    alert(err?.response?.data?.message || "Lỗi khi lưu mã giảm giá");
  }
};


  const handleEdit = (coupon: any) => {
    setFormData({ ...coupon });
    setEditingId(coupon._id);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xoá mã này không?")) {
      await deleteCouponAPI(id);
      loadCoupons();
    }
  };

  return (
    <div className="admin-coupon-wrapper">
      <div className="admin-coupon-inner">
        <div className="sidebar-filter">
          <h3>🔍 Bộ lọc</h3>
          <div className="filter-controls">
            <div className="filter-group">
              <label>MÃ GIẢM GIÁ:</label>
              <input
                type="text"
                name="code"
                value={filters.code}
                onChange={handleFilterChange}
                placeholder="Nhập mã để tìm kiếm..."
              />
            </div>
            <div className="filter-group">
              <label>LOẠI GIẢM GIÁ:</label>
              <select name="discount_type" value={filters.discount_type} onChange={handleFilterChange}>
                <option value="">Tất cả</option>
                <option value="percentage">Phần trăm</option>
                <option value="fixed">Cố định</option>
              </select>
            </div>
            <div className="filter-group">
              <label>TRẠNG THÁI:</label>
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">Tất cả</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
            <div className="filter-group">
              <label>TỪ NGÀY:</label>
              <input
                type="date"
                name="date_from"
                value={filters.date_from}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-group">
              <label>ĐẾN NGÀY:</label>
              <input
                type="date"
                name="date_to"
                value={filters.date_to}
                onChange={handleFilterChange}
              />
            </div>
            <button type="button" onClick={clearFilters} className="clear-filters-btn">
              🗑️ Xóa bộ lọc
            </button>
          </div>
          <div className="filter-summary">
            <span>📊 Hiển thị {filteredCoupons.length} / {coupons.length} mã giảm giá</span>
          </div>
        </div>
        <div className="admin-coupon-page">
      <h2>🎟️ Quản lý mã giảm giá</h2>

      <form onSubmit={handleSubmit} className="coupon-form">
        <input name="code" value={formData.code} onChange={handleChange} placeholder="Mã" required />
        <select name="discount_type" value={formData.discount_type} onChange={handleChange}>
          <option value="percentage">Phần trăm</option>
          <option value="fixed">Cố định</option>
        </select>
        <input name="discount_value" type="number" value={formData.discount_value} onChange={handleChange} placeholder="Giá trị giảm" required />
        <input name="min_order_value" type="number" value={formData.min_order_value} onChange={handleChange} placeholder="Đơn tối thiểu" />
        <input name="start_date" type="date" value={formData.start_date} onChange={handleChange} required />
        <input name="end_date" type="date" value={formData.end_date} onChange={handleChange} required />
        <input name="max_uses" type="number" value={formData.max_uses} onChange={handleChange} placeholder="Số lần dùng" />
        <label>
          <input name="is_active" type="checkbox" checked={formData.is_active} onChange={handleChange} /> Kích hoạt
        </label>
        <button type="submit">{editingId ? "Cập nhật" : "Thêm mã"}</button>
      </form>

          {/* Header cho danh sách card */}
          <div className="coupon-card-list-header">
            <span className="col-code">Mã</span>
            <span className="col-type">Loại</span>
            <span className="col-value">Giá trị</span>
            <span className="col-min">Đơn tối thiểu</span>
            <span className="col-start">Ngày bắt đầu</span>
            <span className="col-end">Ngày kết thúc</span>
            <span className="col-status">Trạng thái</span>
            <span className="col-actions">Hành động</span>
          </div>

          {/* Danh sách mã giảm giá dạng card hàng dọc */}
          <div className="coupon-card-list vertical-list">
            {filteredCoupons.map((coupon) => (
              <div className="coupon-card row-card" key={coupon._id}>
                <span className="col-code">{coupon.code}</span>
                <span className="col-type">{coupon.discount_type}</span>
                <span className="col-value">{coupon.discount_type === "percentage" ? `${coupon.discount_value}%` : `${coupon.discount_value.toLocaleString()}₫`}</span>
                <span className="col-min">{coupon.min_order_value.toLocaleString()}₫</span>
                <span className="col-start">{new Date(coupon.start_date).toLocaleDateString()}</span>
                <span className="col-end">{new Date(coupon.end_date).toLocaleDateString()}</span>
                <span className="col-status">{coupon.is_active ? "✅" : "❌"}</span>
                <span className="col-actions">
                  <button onClick={() => handleEdit(coupon)} title="Sửa">✏️</button>
                  <button onClick={() => handleDelete(coupon._id)} title="Xóa">🗑</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCouponPage;
