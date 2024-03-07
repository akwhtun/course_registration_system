import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Checkbox } from '@material-tailwind/react';
import routes from "@/routes";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaTimesCircle } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa';
function ViewCourseRegistration() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { id } = useParams();
  const { semester } = useParams();
  const [loading, setLoading] = useState(false);
  const [statusLoading,setStatusLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [newCourseData, setNewCourseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    setLoading(true);
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/crsforcu/backend/routes/course_registration_api.php?endpoint=get_registration_history&id=${id}&semester=${semester}`
        );
        if (response.status === 200) {
          console.log(response.data);
          const { historyData, registrationData, registrationData1 } = response.data;
          setHistoryData(historyData);
          setCourseData(registrationData);
          setNewCourseData(registrationData1);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);

      }

    }
    fetchHistory(); // Move this call inside the if block
  }, [id]);

  const handleStatusChange = async (statusVal) => {
    setStatusLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/crsforcu/backend/routes/course_registration_api.php?endpoint=change_registration_status&id=${historyData.length > 0 && historyData[0]?.cr_code}&status=${statusVal}&semester=${historyData.length > 0 && historyData[0]?.semester}&user_id=${historyData.length > 0 && historyData[0]?.user_id}`
      );
      if (response.status === 200) {
         setStatusLoading(false);
        console.log(response.data);
navigate('/course_registration/view?success=Status Changed!')
      }
    } catch (error) {
      setStatusLoading(false);
      setError(error.message);

    }
  }
  const coursesWithSS = courseData.filter(item => item.course_code.includes('(SS') || item.course_code.includes('(SK'));
  const coursesWithoutSS = courseData.filter(item => !item.course_code.includes('(SS') && !item.course_code.includes('(SK'));

  const newCoursesWithSS = newCourseData.filter(item => item.course_code.includes('(SS') || item.course_code.includes('(SK'));
  const newCoursesWithoutSS = newCourseData.filter(item => !item.course_code.includes('(SS') && !item.course_code.includes('(SK'));

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

    let currentSemester;
    switch (semester) {
      case 'Semester 0':
        currentSemester=1;
        break;
      case 'Semester I':
        currentSemester=2;
        break;
      case 'Semester II':
        currentSemester=3;
        break;
      case 'Semester III':
        currentSemester=4;
        break;
      case 'Semester IV':
        currentSemester=5;
        break;
      case 'Semester V':
        currentSemester=6;
        break;
      case 'Semester VI':
        currentSemester=7;
        break;
      case 'Semester VII':
        currentSemester=8;
        break;
      case 'Semester XI':
        currentSemester=9;
        break;
      case 'Semester XI':
        currentSemester=10;
        break;
    
      default:
        break;
    }
    return `(${degree}) Semester(${currentSemester})`
  }

  if (loading) {
    return  <div className="loader-container">
    <div className="loader"></div>
    <div className="loading-text font-semibold">AKWH</div>
  </div>;
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

    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}

        activeNav='Course Registration'
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <div className='flex justify-between items-center'>
          <Link to="/course_registration/view">
            <MdOutlineKeyboardBackspace style={{ fontSize: '24px' }} />
          </Link>
        
{/* dropdown */}
<div className="relative inline-block text-left lg:me-3">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border bg-black text-white px-4 py-1"
          onClick={toggleDropdown}
          disabled={ statusLoading }
        >
          {statusLoading === true ? "Changing..." : "Status"}
         
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-collapse border-black text-black bg-white z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <p
              className="flex px-4 py-2 text-lg items-center text-yellow-500"
              role="menuitem" onClick={() => handleStatusChange(0)}
            >
              Pending... <FaClock/>
            </p>
            <p
              className="flex px-4 py-2 text-lg items-center text-green-500"
              role="menuitem" onClick={() => handleStatusChange(1)}
            >
              Approve <IoIosCheckmarkCircleOutline/>
            </p>
            <p
              className="flex px-4 py-2 text-lg items-center text-red-500"
              role="menuitem" onClick={() => handleStatusChange(2)}
            >
              Reject <FaTimesCircle/>
            </p>
          </div>
        </div>
      )}
    </div>
  

        </div>
        <div className={` page-head border border-collapse border-x-4 m-5 shadow lg:w-4/5 mx-auto ${historyData.length > 0 && historyData[0]?.status === 0 ? 'border-yellow-500' :
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


          <div className='text-center font-semibold text-lg  mt-3'>
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
        </div>
      </div>
    </div>
  )
}

export default ViewCourseRegistration;
