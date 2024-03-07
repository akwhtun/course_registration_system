import React from 'react';
import Header from './Header';
import Footer from './Footer';
const About = () => {
  return (
<div className='min-h-screen relative'>
    <Header/>
    <div className="container mx-auto px-20 mt-20">
      <h1 className="text-3xl font-bold mb-4">Course Registration System Documentation</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Introduction</h2>
          <p className="text-gray-700">
            Welcome to the documentation page for our course registration system. This system is designed to facilitate the process of registering for courses at our computer university.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>User authentication and authorization</li>
            <li>Course search and registration</li>
            <li>Viewing course schedule and registration history</li>
            <li>Admin panel for managing courses, students, and registrations</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Usage</h2>
        <p className="text-gray-700">
          To use the system, users must first create an account and log in. Once logged in, they can search for courses, register for them, and view their schedule and registration history.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Support</h2>
        <p className="text-gray-700">
          For any questions or issues related to the course registration system, please contact our support team at support@university.com.
        </p>
      </div>
    </div>
    <div className='absolute bottom-0 left-0 w-full'>
        <Footer/>
    </div>
    </div>
  );
};

export default About;
