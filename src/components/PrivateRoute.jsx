import React from 'react';
import { useContext } from "react";
import AuthContext from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';
// import { Navigate, useLocation } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!user) {
    console.warn("User not authenticated. Redirecting to login.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
