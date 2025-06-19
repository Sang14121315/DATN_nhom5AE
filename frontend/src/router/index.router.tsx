import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/admin.layout";
import DashboardPage from "@/pages/admin/Dashboard";

// import user
import AuthLayout from "@/layouts/auth.layout";
import ProductlistPage from "@/pages/user/productList";
import ProductdetailPage from "@/pages/user/productDetail";
import HomePage from "@/pages/user/home";
import LoginPage from "@/pages/user/login";
import RegisterPage from "@/pages/user/register";
import ForgotPasswordPage from "@/pages/user/forgotPassword";
import CartPage from "@/pages/user/CartPage";
import CheckoutPage from "@/pages/user/CheckoutPage";

const MainRouter = () => {
  return (
    <Routes>
      {/* Admin layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>

      {/* User layout */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="productlist" element={<ProductlistPage />} />
        <Route path="product/:id" element={<ProductdetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
