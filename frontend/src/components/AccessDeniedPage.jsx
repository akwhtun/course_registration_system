import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const AccessDeniedPage = () => {
  return (
    <div className='min-h-screen relative'> 
    <Header/>
       <div className="flex items-center justify-center mt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">403 Forbidden</h2>
        <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
        <Link to="/" className="text-black hover:underline">Go to Home Page</Link>
      </div>
    </div>
    <div  className="absolute bottom-0  left-0 w-full ">
    <Footer/>
    </div>
    </div>

  );
};

export default AccessDeniedPage;
