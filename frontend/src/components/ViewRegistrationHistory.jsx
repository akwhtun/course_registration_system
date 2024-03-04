import React, { useState, useEffect } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { Checkbox, Button } from '@material-tailwind/react';
import Header from './Header';
import Footer from './Footer';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaTimesCircle } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';

function ViewRegistrationHistory() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [newCourseData, setNewCourseData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const storedAuthUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedAuthUser) {
      setAuthUser(storedAuthUser);
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/crsforcu/backend/routes/course_registration_api.php?endpoint=get_registration_history&id=${authUser.user_id}&semester=${authUser.semester}`
          );
          if (response.status === 200) {
            const { historyData, registrationData, registrationData1 } = response.data;
            setHistoryData(historyData);
            setCourseData(registrationData);
            setNewCourseData(registrationData1);
            setLoading(false);
          }
        } catch (error) {
          setError(error.message);
        }
      };

      fetchHistory(); // Move this call inside the if block
    }
  }, [authUser]);

  const coursesWithSS = courseData.filter(item => item.course_code.includes('(SS)') || item.course_code.includes('(SK)'));
  const coursesWithoutSS = courseData.filter(item => !item.course_code.includes('(SS)') && !item.course_code.includes('(SK)'));

  const newCoursesWithSS = newCourseData.filter(item => item.course_code.includes('(SS)') || item.course_code.includes('(SK)'));
  const newCoursesWithoutSS = newCourseData.filter(item => !item.course_code.includes('(SS)') && !item.course_code.includes('(SK)'));

  const getDegreeAndSemester = ($major, $semester) => {
    let degree = "";
    let semester = "";
    const major = $major; // Added optional chaining (?)

    switch (major) {
      case "Computer Science and Computer Technology":
        degree = "B.C.Sc./B.C.Tech."
        break;
      case "Computer Science":
        degree = "B.C.Sc."
        break;
      case "Computer Technology":
        degree = "B.C.Tech."
        break;
      default:
        break;
    }

    semester = $semester;

    return `(${degree}) ${semester}`
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {

    return (<div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="ms-3 text-sm font-medium">
        {error}
      </div>

    </div>
    )
  }
  return (

    <>
      <Header />
     {historyData != "" ? 
     ( <div className={` page-head border border-collapse border-x-4 m-5 shadow lg:w-4/6 mx-auto ${historyData.length > 0 && historyData[0]?.status === 0 ? 'border-yellow-500' :
     historyData.length > 0 && historyData[0]?.status === 1 ? 'border-green-500' :
       historyData.length > 0 && historyData[0]?.status === 2 ? 'border-red-500' :
         ''}`}>


   <div className="icon-status">
     {historyData.length > 0 && historyData[0]?.status === 0 ? (
       <p className='text-yellow-500'>
         Pending... <FaClock />
       </p>
     ) : (
       ''
     )}

     {historyData.length > 0 && historyData[0]?.status === 1 ? (
       <p className='text-green-500'>
         Approve <IoIosCheckmarkCircleOutline />
       </p>
     ) : (
       ''
     )}

     {historyData.length > 0 && historyData[0]?.status === 2 ? (
       <p className='text-red-500'>
         Reject <FaTimesCircle />
       </p>
     ) : (
       ''
     )}
   </div>


   <div className='text-center font-semibold text-lg bg-gray-50 text-gray-900 mt-3'>
     <h1>University of Computer Studies (Pakokku)</h1>
     <h1>{historyData.length > 0 && historyData[0]?.academic_year} Academic Year</h1>
     <h1>{getDegreeAndSemester(historyData.length > 0 && historyData[0]?.major, historyData.length > 0 && historyData[0]?.semester)}</h1>
   </div>
   <h1 className='mt-4 text-center font-semibold text-lg crf'>Course Registration Form</h1>
   <div className='container mx-auto mt-10 md:px-24 px-5'>

     <p className='text-base'>This completed form must be submitted to the office of register.</p>
     <div className='mt-3'>
       <p className='mt-3'><span className='md:w-72 w-60 inline-block'>1. Student Name </span> :  <span className='ms-3 font-bold'>{historyData.length > 0 && historyData[0]?.student_name}</span></p>
       <p className='mt-3'><span className='md:w-72 w-60 inline-block'>2. Registration Number </span> :  <span className='ms-3 font-bold'>{historyData.length > 0 && historyData[0]?.user_id}</span></p>
       <p className='mt-3'><span className='md:w-72 w-60 inline-block'>3. Email Address/Phone Number </span> :  <span className='ms-3 font-bold'>{historyData.length > 0 && `${historyData[0]?.email}/${historyData[0]?.phone}`}</span> </p>

       {
         newCourseData == "" ?
           (
             <div className='mt-5'>
               <p>4. The new Subjects that I would like to take for this Semester (Tick the Box) </p>
               <div className='ms-2'>


                 {coursesWithoutSS.map((item, index) => {
                   const isCourseChecked = historyData.find(history => history.course_name === item.course_name);
                   return (
                     <div className='flex items-center mt-1' key={index}>
                       <Checkbox defaultChecked={isCourseChecked} disabled />
                       <span className='w-32 inline-block'>{item.course_code}</span>
                       <span>{item.course_name}</span>
                     </div>
                   );
                 })}



               </div>

               <p className='mt-5 ms-6'>Supporting Skills:</p>
               <div className='ms-2 mt-1'>

                 {coursesWithSS.map((item, index) => {
                   const isCourseChecked = historyData.find(history => history.course_name === item.course_name);
                   return (

                     <div className='flex items-center mt-1' key={index}>

                       <Checkbox disabled defaultChecked={isCourseChecked} />
                       <span className='w-32 inline-block'>{item.course_code}</span>
                       <span>{item.course_name}</span>
                     </div>
                   );
                 })}



               </div>
             </div>
           ) :
           (<div>

             <div className='mt-5'>
               <span className='md:w-72 w-60 inline-block'>4. Select NOT - Completed subjects </span>:
               <div className='ms-2'>
                 {coursesWithoutSS.map((item, index) => {
                   const isCourseChecked = historyData.find(history => history.course_name === item.course_name);
                   return (
                     <div className='flex items-center mt-1' key={index}>
                       <Checkbox defaultChecked={isCourseChecked} disabled />
                       <span className='w-32 inline-block'>{item.course_code}</span>
                       <span>{item.course_name}</span>
                     </div>
                   );
                 })}
               </div>


               <p className='mt-5 ms-6'>Supporting Skills:</p>
               <div className='ms-2 mt-1'>


                 {coursesWithSS.map((item, index) => {
                   const isCourseChecked = historyData.find(history => history.course_name === item.course_name);
                   return (

                     <div className='flex items-center mt-1' key={index}>
                       <Checkbox
                         disabled
                         defaultChecked={isCourseChecked}
                       />
                       <span className='w-32 inline-block'>{item.course_code}</span>
                       <span>{item.course_name}</span>
                     </div>
                   );
                 })}




               </div>
             </div>


             <div className='mt-5'>
               <p>5. The new Subjects that I would like to take for this Semester (Tick the Box) </p>
               <div className='ms-2'>

                 {newCoursesWithoutSS.map((item, index) => {
                   const isCourseChecked = historyData.find(history => history.course_name === item.course_name);

                   return (
                     <div className='flex items-center mt-1' key={index}>
                       <Checkbox
                         defaultChecked={isCourseChecked}
                         disabled
                       />
                       <span className='w-32 inline-block'>{item.course_code}</span>
                       <span>{item.course_name}</span>
                     </div>
                   );
                 })}



               </div>

               <p className='mt-5 ms-6'>Supporting Skills:</p>
               <div className='ms-2 mt-1'>
                 {newCoursesWithSS.map((item, index) => {
                   const isCourseChecked = historyData.find(history => history.course_name === item.course_name);
                   return (
                     <div className='flex items-center mt-1' key={index}>
                       <Checkbox
                         disabled
                         defaultChecked={isCourseChecked}
                       />
                       <span className='w-32 inline-block'>{item.course_code}</span>
                       <span>{item.course_name}</span>
                     </div>
                   );
                 })}


               </div>
             </div>
           </div>)
       }
       <span className='inline-block w-52 ms-6 mt-6 mb-3'>Student Aggrement:</span> I agree to abide by all policies and procedures.
     </div>


   </div>
 </div>) : 
     (<div className='w-full flex items-center justify-center text-lg shadow' style={{height:"80vh"}}>No Registration to show...</div>)}
      <Footer />

    </>
  )
}

export default ViewRegistrationHistory;
