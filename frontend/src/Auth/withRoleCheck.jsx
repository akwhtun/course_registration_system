import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const withRoleCheck = (allowedRoles) => (WrappedComponent) => {
  const WithRoleCheck = (props) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      // Get user role from sessionStorage or wherever it's stored
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user && allowedRoles.includes(user.role_id)) {
        setUserRole(user.role_id);
      }
    }, []);

    if (userRole === null) {
      // You may want to handle the case where userRole is still loading
      return <div>Loading...</div>;
    }

    // Check if the user's role is allowed
    if (!allowedRoles.includes(userRole)) {
      // Redirect to a different route if the user's role is not allowed
      return <Navigate to="/access_denied" />;
    }

    // Render the wrapped component if the user's role is allowed
    return <WrappedComponent {...props} />;
  };

  return WithRoleCheck;
};

export default withRoleCheck;
