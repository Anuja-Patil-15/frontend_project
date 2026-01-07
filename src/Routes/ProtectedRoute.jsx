import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/Context";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(UserContext);

  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  
  if (role && user.role !== role) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
