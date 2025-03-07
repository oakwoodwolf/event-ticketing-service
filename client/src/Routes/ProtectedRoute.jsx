import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!allowedRoles) {
      return <Navigate to="/unauthorized" />;
    }
    return children ? children : <Outlet/>;
  };
export default ProtectedRoute;