import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/admin.layout";
import DashboardPage from "@/pages/admin/Dashboard";
// import AuthLayout from "@/layouts/auth.layout";

// import user 
import AuthLayout from "@/layouts/auth.layout";
import ProductlistPage from "@/pages/user/productList";
import ProductdetailPage from "@/pages/user/productDetail";
// Các page giả định
const MainRouter = () => {
  return (
    <Routes>
     
      {/* Admin layout */}
      <Route path="/admin" element={< AdminLayout />}>
      <Route path="dashboard" element={<DashboardPage />} />
      </Route>

      {/* user layout */}
      <Route path="/" element={< AuthLayout />}>
      <Route path="productlist" element={<ProductlistPage />} />
      <Route path="productdetail" element={<ProductdetailPage />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
