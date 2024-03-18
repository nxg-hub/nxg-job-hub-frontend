import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isLoggedIn  from '../hooks/isLoggedIn';

// function ProtectedRoute() {

//   return (
//     <div>
//       {isLoggedIn() ? <Outlet /> : <Navigate to="/register" />}
//     </div>
//   );
// }

function ProtectedRoute() {
  if (!isLoggedIn()) {
    // Redirect to the login page if not logged in
    return <Navigate to="/login" />;
  }

  // Render the protected content
  return <Outlet />;
}

export default ProtectedRoute