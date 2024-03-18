import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isLoggedIn  from '../hooks/isLoggedIn';

function ProtectedRoute() {
  if (!isLoggedIn()) {
    // Redirect to the login page if not logged in
    return <Navigate to="/register" />;
  }

  // Render the protected content
  return <Outlet />;
}

export default ProtectedRoute