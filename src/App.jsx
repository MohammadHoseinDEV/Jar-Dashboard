import { Route, Routes } from "react-router";
import LoginPage from "./features/auth/Pages/LoginPage";
import ForgetPassword from "./features/auth/Pages/ForgetPassword";
import RegisterPage from "./features/auth/Pages/RegisterPage";
import { Provider } from "react-redux";
import Store from "./app/Store";
import Dashboard from "./features/dashboard/Pages/Dashboard";
import PrivateRoute from "./features/dashboard/components/PrivateRoute";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={Store}>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
