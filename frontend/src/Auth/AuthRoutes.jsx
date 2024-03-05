import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoutes = ({ children, status }) => {
//   const [auth, setAuth] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     if (user) {
//      setAuth(true);
//     }
//     setIsLoading(false); 
//   }, []);

//   if (isLoading) {
//     // Render a loading indicator while userRole is being determined
//     return <div>Loading...</div>;
//   }


//  if(status === "login"){
//     if(auth){
//         return <Navigate to="/" replace />;
//     }else{
//         return children;
//     }
//  }else{
//     if(auth){
//         return children;
//     }else{
//         return <Navigate to="/users/login" replace />;
//     }
//  }
return children;

}

export default AuthRoutes;
