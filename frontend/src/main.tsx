import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "@/context/CartContext";

// Import styles
import "@/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// React Router
import { BrowserRouter } from "react-router-dom";

// Render root
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
