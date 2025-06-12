// import Footer from "@/components/user/Footer";
// import Header from "@/components/user/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="user-layout">
        <main className="user-content">
        {/* <Header /> */}
            <Outlet /> 
        {/* <Footer /> */}
        </main>
    </div>
  );
};

export default AuthLayout;
