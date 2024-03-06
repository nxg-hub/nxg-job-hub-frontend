import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isLoggedIn  from '../hooks/isLoggedIn';

function ProtectedRoute() {

  return (
    <div>
      {isLoggedIn() ? <Outlet /> : <Navigate to="/register" />}
    </div>
  );
}

export default ProtectedRoute