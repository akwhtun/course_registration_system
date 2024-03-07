import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoutes = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
     setAuth(true);
    }
    setIsLoading(false); 
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  if(auth){
    return <Navigate to="/" replace />;
  }else{
    return children;
  }
 

}

export default AuthRoutes;
