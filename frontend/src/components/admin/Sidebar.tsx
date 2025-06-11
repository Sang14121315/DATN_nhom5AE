import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaThList,
  FaListAlt,
  FaTags,
  FaShoppingCart,
  FaTicketAlt,
  FaUser,
  FaCommentDots,
} from "react-icons/fa";
import "@/styles/components/admin/sidebar.scss";

const SidebarMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <FaBox />, label: "Sản phẩm", path: "/admin/products" },
    { icon: <FaThList />, label: "Danh mục", path: "/admin/categories" },
    { icon: <FaListAlt />, label: "Loại sản phẩm", path: "/admin/product-types" },
    { icon: <FaTags />, label: "Thương hiệu", path: "/admin/brands" },
    { icon: <FaShoppingCart />, label: "Đơn hàng", path: "/admin/orders" },
    { icon: <FaTicketAlt />, label: "Mã giảm giá", path: "/admin/discounts" },
    { icon: <FaUser />, label: "Người dùng", path: "/admin/users" },
    { icon: <FaCommentDots />, label: "Phản hồi & Thông báo", path: "/admin/feedback" },
  ];

  return (
    <nav className="sidebar-menu">
      <div className="logo">5AE</div>
      {menuItems.map(({ icon, label, path }) => {
        const isActive = location.pathname === path;
        return (
          <div
            key={label}
            className={`sidebar-item ${isActive ? "active" : ""}`}
            onClick={() => navigate(path)}
          >
            <span className="icon">{icon}</span>
            <span className="label">{label}</span>
          </div>
        );
      })}
    </nav>
  );
};

export default SidebarMenu;
