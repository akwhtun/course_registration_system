import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox } from '@material-tailwind/react';
import Header from './Header';
import Footer from './Footer';

function CourseRegistration() {
  const [authUser, setAuthUser] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [newCourseData, setNewCourseData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authUser = JSON.parse(sessionStorage.getItem('user'));
    if (authUser) {
      setAuthUser(authUser);

      const fetchCourseRegistration = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8000/crsforcu/backend/routes/course_registration_api.php?endpoint=get_student_data&id=${authUser.user_id}`
          );
          if (response.status === 200) {
            const { registrationData, registrationData1 } = response.data;
            setCourseData(registrationData1);
            setNewCourseData(registrationData);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchCourseRegistration();
    }
  }, []);

  const getCurrentAcademicYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-center text-3xl font-semibold mb-4'>
          University of Computer Studies (Pakokku)
        </h1>
        <h2 className='text-center mb-4'>
          {getCurrentAcademicYear()} Academic Year
        </h2>
        <h2 className='text-center mb-8'>
          Degree and Semester Information
        </h2>
        <div className='bg-white shadow-md rounded-md px-6 py-8'>
          <h2 className='text-lg font-semibold mb-4'>Course Registration Form</h2>
          <p className='mb-4'>This completed form must be submitted to the office of register.</p>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <p className='mb-4'>
                <span className='font-semibold'>Student Name:</span>{' '}
                {courseData.length > 0 && courseData[0]?.name}
              </p>
              <p className='mb-4'>
                <span className='font-semibold'>Registration Number:</span>{' '}
                {courseData.length > 0 && courseData[0]?.id}
              </p>
              <p className='mb-4'>
                <span className='font-semibold'>Email Address/Phone Number:</span>{' '}
                {courseData.length > 0 && `${courseData[0]?.email}/${courseData[0]?.phone}`}
              </p>
            </div>
            <div>
              <p className='mb-4'>
                <span className='font-semibold'>Select NOT-Completed Subjects:</span>
              </p>
              {/* Render checkboxes for NOT-Completed Subjects here */}
            </div>
          </div>
          <div className='mt-6'>
            <p className='font-semibold'>Student Agreement:</p>
            <p>I agree to abide by all policies and procedures.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CourseRegistration;
