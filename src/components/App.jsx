import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
// import MainPage from "./MainPage";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} style={{ zIndex: 9999 }} />

      <Outlet />
    </div>
  );
}

export default App;
