import { Routes, Route } from "react-router-dom";
import AdminLayout from "@/layouts/admin.layout";
import DashboardPage from "@/pages/admin/Dashboard";
// import AuthLayout from "@/layouts/auth.layout";

// Các page giả định

const MainRouter = () => {
  return (
    <Routes>
     
      {/* Admin layout */}
      <Route path="/admin" element={< AdminLayout />}>
      <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
};

export default MainRouter;
