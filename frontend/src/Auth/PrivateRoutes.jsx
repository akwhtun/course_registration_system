import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, role }) => {
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      if (user.role_id === 1) {
        setUserRole('admin');
      } else if (user.role_id === 2) {
        setUserRole('sub_admin');
      } else {
        setUserRole('student');
      }
    }
    setIsLoading(false); // Set loading to false after useEffect completes
  }, []);

  if (isLoading) {
    // Render a loading indicator while userRole is being determined
    return <div>Loading...</div>;
  }

  if (userRole === null) {
    return <Navigate to="/users/login" replace />;
  }

  return userRole === role ? children : <Navigate to="/access_denied" replace />;
}

export default PrivateRoutes;
