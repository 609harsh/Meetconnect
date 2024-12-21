import React from "react";
import { Navigate } from "react-router-dom"; // Import the context

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  if (!localStorage.getItem("token")) {
    // Redirect to login if the user is not signed in
    return <Navigate to="/login" replace />;
  }

  // Render the protected route if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
