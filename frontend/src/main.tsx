import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext"; // ✅ thêm dòng này

// Import global styles
import "@/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Mount app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <OrderProvider> {/* ✅ Bọc App bằng OrderProvider */}
          <App />
        </OrderProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
