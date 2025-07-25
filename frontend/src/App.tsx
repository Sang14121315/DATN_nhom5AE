import React from "react";
import { ToastContainer } from "react-toastify";
import MainRouter from "./router/index.router";
import ChatbotWidget from "./components/user/ChatbotWidget";

const App: React.FC = () => {
  return (
    <>
      <MainRouter />
      <ToastContainer position="top-right" autoClose={3000} />
      <ChatbotWidget />
    </>
  );
};

export default App;
