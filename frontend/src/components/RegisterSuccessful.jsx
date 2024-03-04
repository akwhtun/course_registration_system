import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
function RegisterSuccessful ()  {
  return (
    <>
     <Header />

      {/* Main Content */}
      <div className="container mx-auto my-8 px-4">
        <div className="bg-white shadow-md rounded-md p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-4">Your course registration has been successfully completed.</p>
          <div className="flex justify-center">
            <Link to="/">
                <Button color='gray'>Back To Home</Button>
            </Link>
          </div>
        </div>
      </div>

    <Footer/>
    </>
  );
};

export default RegisterSuccessful;
