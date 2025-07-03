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
  const [formData, setFormData] = useState<any>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadCoupons = async () => {
    const data = await fetchCoupons();
    setCoupons(data);
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
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
      await createCouponAPI(payload);
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

      <table className="coupon-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Loại</th>
            <th>Giá trị</th>
            <th>Đơn tối thiểu</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon.code}</td>
              <td>{coupon.discount_type}</td>
              <td>
                {coupon.discount_type === "percentage"
                  ? `${coupon.discount_value}%`
                  : `${coupon.discount_value.toLocaleString()}₫`}
              </td>
              <td>{coupon.min_order_value.toLocaleString()}₫</td>
              <td>{new Date(coupon.start_date).toLocaleDateString()}</td>
              <td>{new Date(coupon.end_date).toLocaleDateString()}</td>
              <td>{coupon.is_active ? "✅" : "❌"}</td>
              <td>
                <button onClick={() => handleEdit(coupon)}>✏️</button>
                <button onClick={() => handleDelete(coupon._id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponPage;
