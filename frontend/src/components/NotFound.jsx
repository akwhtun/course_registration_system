import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
const NotFound = () => {
  return (
    <div className='min-h-screen'> 
       <div className="flex items-center justify-center pt-24">
      <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">404 Not Found</h2>
        <p className="text-gray-600 mb-4">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="text-black hover:underline">Go to Home Page</Link>
      </div>
    </div>
    </div>
  
  );
};

export default NotFound;
