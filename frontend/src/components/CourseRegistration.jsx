import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox, Button, useAccordion } from '@material-tailwind/react';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { FaRegPaperPlane } from "react-icons/fa6";

function CourseRegistration() {
  const [authUser, setAuthUser] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [newCourseData, setNewCourseData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failSubject, setFailSubject] = useState([]);
  const [checkedCourses, setCheckedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = JSON.parse(sessionStorage.getItem('user'));
    if (authUser) {
      setAuthUser(authUser);

      const fetchCourseRegistration = async () => {
        setLoading(true);
        try {
          //&id=ucspku-000714&semester=Semester%20II
          const response = await axios.get(
            `http://localhost:8000/crsforcu/backend/routes/course_registration_api.php?endpoint=get_student_data&id=${authUser.user_id}&semester=${authUser.semester}`
          );
          if (response.status === 200) {
            const {historyData, registrationData, registrationData1 } = response.data;
            setHistoryData(historyData);
            setCourseData(registrationData);
            setNewCourseData(registrationData1);
            const failSubjects = registrationData.filter(item => item.remark === "Fail").map(item => item.course_name);
            setFailSubject(failSubjects);
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

  const coursesWithSS = courseData.filter(item => item.course_code.includes('(SS)') || item.course_code.includes('(SK)'));
  const coursesWithoutSS = courseData.filter(item => !item.course_code.includes('(SS)') && !item.course_code.includes('(SK)'));

  const newCoursesWithSS = newCourseData.filter(item => item.course_code.includes('(SS)') || item.course_code.includes('(SK)'));
  const newCoursesWithoutSS = newCourseData.filter(item => !item.course_code.includes('(SS)') && !item.course_code.includes('(SK)'));

  const getCurrentAcademicYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear}`;
  };


  const getDegreeAndSemester = () => {
    let degree = "";
    let semester = "";
    const major = courseData && courseData[0]?.major; // Added optional chaining (?)

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

    semester = courseData && courseData[0]?.semester; // Added optional chaining (?)

    return `(${degree}) ${semester}`
  }

  const handleCheckboxChange = (event, course) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedCourses(prev => [...prev, course]);
    } else {
      setCheckedCourses(prev => prev.filter(item => item.course_name !== course.course_name));
    }
  };


    let year = getCurrentAcademicYear();
  const handleSubmit = async () => {
    try {
      // console.log(checkedCourses);
      const response = await axios.post(
        `http://localhost:8000/crsforcu/backend/routes/course_registration_api.php?endpoint=register_course&id=${authUser.user_id}&name=${authUser.name}&academic=${year}&semester=${authUser.semester}&year=${authUser.student_year}&major=${authUser.major}`,
        checkedCourses
      );
      if (response.status === 200) {
        // setMessage(response.data.message)
        navigate(`/students/success_register`);

      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setError(error.message);
    }
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
      
      {historyData.length === 0 || historyData[0].status === 0 || historyData[0].status === 2 ?(
        <>
         <div className='text-center font-semibold text-lg bg-gray-50 text-gray-900 mt-3'>
         <h1>University of Computer Studies (Pakokku)</h1>
         <h1>{getCurrentAcademicYear()} Academic Year</h1>
         <h1>{getDegreeAndSemester()}</h1>
       </div>
       <h1 className='mt-4 text-center font-semibold text-lg crf'>Course Registration Form</h1>
       <div className='container mx-auto mt-10 md:px-24 px-5'>
 
         <p className='text-base'>This completed form must be submitted to the office of register.</p>
         {message}
         <div className='mt-3'>
           <p className='mt-3'><span className='md:w-72 w-60 inline-block'>1. Student Name </span> :  <span className='ms-3 font-bold'>{courseData.length > 0 && courseData[0]?.name}</span></p>
           <p className='mt-3'><span className='md:w-72 w-60 inline-block'>2. Registration Number </span> :  <span className='ms-3 font-bold'>{courseData.length > 0 && courseData[0]?.id}</span></p>
           <p className='mt-3'><span className='md:w-72 w-60 inline-block'>3. Email Address/Phone Number </span> :  <span className='ms-3 font-bold'>{courseData.length > 0 && `${courseData[0]?.email}/${courseData[0]?.phone}`}</span> </p>
 
           {
             newCourseData == "" ?
               (
                 <div className='mt-5'>
                   <p>4. The new Subjects that I would like to take for this Semester (Tick the Box) </p>
                   <div className='ms-2'>
 
 
                     {coursesWithoutSS.map((item, index) => {
                       return (
                         <div className='flex items-center mt-1' key={index}>
                           <Checkbox />
                           <span className='w-32 inline-block'>{item.course_code}</span>
                           <span>{item.course_name}</span>
                         </div>
                       );
                     })}
 
 
 
                   </div>
 
                   <p className='mt-5 ms-6'>Supporting Skills:</p>
                   <div className='ms-2 mt-1'>
 
                     {coursesWithSS.map((item, index) => {
                       return (
                         <div className='flex items-center mt-1' key={index}>
                           <Checkbox />
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
                       return (
                         <div className='flex items-center mt-1' key={index}>
                           <Checkbox
                             disabled={item.remark !== "Fail"}
                             onChange={(event) => handleCheckboxChange(event, item)}
                           />
                           <span className='w-32 inline-block'>{item.course_code}</span>
                           <span>{item.course_name}</span>
                         </div>
                       );
                     })}
 
                   </div>
 
                   <p className='mt-5 ms-6'>Supporting Skills:</p>
                   <div className='ms-2 mt-1'>
 
 
                     {coursesWithSS.map((item, index) => {
                       return (
                         <div className='flex items-center mt-1' key={index}>
                           <Checkbox
                             disabled={item.remark !== "Fail"}
                             onChange={(event) => handleCheckboxChange(event, item)}
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
                       const isFail = failSubject.includes(item.prequisite_course);
 
                       return (
                         <div className='flex items-center mt-1' key={index}>
                           <Checkbox
                             disabled={isFail}
                             onChange={(event) => handleCheckboxChange(event, item)}
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
                       return (
                         <div className='flex items-center mt-1' key={index}>
                           <Checkbox
                             onChange={(event) => handleCheckboxChange(event, item)}
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
           <span className='inline-block w-52 ms-6 mt-6'>Student Aggrement:</span> I agree to abide by all policies and procedures.
         </div>
 
         <Button size='md' className='flex items-center justify-center my-5 ms-5' onClick={handleSubmit}><FaRegPaperPlane style={{ fontSize: "24" }} /><span className='ms-3'>Submit</span></Button>
       </div>
       </>
      ) : 
      (<div className='h-20 w-full'>You can't register now!</div>)
      
          }
     
      <Footer />

    </>
  
  );


}

export default CourseRegistration;
