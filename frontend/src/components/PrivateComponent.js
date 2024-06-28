import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function PrivateComponent() {
  const auth = sessionStorage.getItem("token");
  
  return auth ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateComponent;
