import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const Routess = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminRoute />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routess;
