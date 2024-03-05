import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, userRole, ...rest }) => {
  const isAdmin = userRole == '1';
  const isSubAdmin = userRole == '2';
  const isStudent = userRole == '3' ;

  console.log(isAdmin,isStudent,isSubAdmin);
  if (isAuthenticated) {
    if (isAdmin || isSubAdmin) {
      return <Route {...rest} element={element} />;
    } else if (isStudent) {
      console.log("su");
      if (rest.path === '/students/course_register' || rest.path === '/students/registration_history') {
        return <Route {...rest} element={element} />;
      } else {
        return <Navigate to="/access_denied" replace />;
      }
    } else {
      return <Navigate to="/access_denied" replace />;
    }
  } else {
    return <Navigate to="/users/login" replace />;
  }
}

export default ProtectedRoute;
