import { ToastContainer } from "react-toastify";
import MainRouter from "./router/index.router";

function App() {
  return (
    <>
      <MainRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
