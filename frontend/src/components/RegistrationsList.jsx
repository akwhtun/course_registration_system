import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
function RegistrationsList() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const updateParam = queryParams.get('success');


 
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const [registrationData, setRegistrationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateAlert, setUpdateAlert] = useState(updateParam);

  useEffect(() => {
    const fetchStudentsRegistration = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/crsforcu/backend/routes/course_registration_api.php?endpoint=registrations_list"
        );

        if (response.status === 200) {
          setRegistrationData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudentsRegistration();
  }, []);
  const handleCloseAlert = () => {
    setUpdateAlert(null);
  };

  
  if (loading) {
    return  <div className="loader-container">
    <div className="loader"></div>
    <div className="loading-text font-semibold">AKWH</div>
  </div>;
  }

  else if (error) {
    return <div>Error: {error}</div>;
  } else {

    return (
      <div className="min-h-screen bg-blue-gray-50/50">
        <Sidenav
          routes={routes}
          brandImg={
            sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
          }
          activeNav='Course Registration'
        />
        <div className="p-4 xl:ml-80">
          <DashboardNavbar />
         {/* <LinkButtons/> */}
          <div className="mt-5 mb-8 flex flex-col gap-12 ">
            <Card>
              {updateAlert && (
                <div className="px-6">
                  <div id="alert-1" className="flex items-center p-4 my-2 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">
                      {updateAlert}
                    </div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" onClick={() => handleCloseAlert()} aria-label="Close">
                      <span className="sr-only">Close</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            
              <CardHeader variant="gradient" color="gray" className="mb-8 mt-1 p-6">
                <Typography variant="h6" color="white">
                  Students Registration List
                </Typography>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {[ "student name","detail", "academic year","status","date",  ""].map((el, index) => (
                        <th
                          key={index}
                          className="border-b border-blue-gray-50 py-3 px-5 text-left"
                        >
                          <Typography
                            variant="small"
                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {registrationData.map(
                      ({id, cr_code,user_id, student_name, student_year,semester,major,academic_year , created_date, status}) => {
                        const className = `py-3 px-5 ${id === registrationData.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                          }`;

                        return (
                          <tr key={id}>
                    
                           
                            <td className={`py-3 px-5`}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {student_name}
                              </Typography>
                            </td>
                            <td className={`py-3 px-5`}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {major}
                              </Typography>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {student_year} / {semester}
                              </Typography>
                            </td>
                            <td className={`py-3 px-5`}>
                              <Chip
                                variant="gradient"
                                color="green"
                                value={academic_year}
                                className="py-0.5 px-2 text-[11px] font-medium w-fit"
                              />
                            </td>
                            <td className={`py-3 px-5`}>
                              <Chip
                                variant="gradient"
                                color={status === 0 ? "yellow" : status === 1 ? "green" : status === 2 ? "red" : ""} 
                                value={status === 0 ? "Pending" : status === 1 ? "Approve" : status === 2 ? "Reject" : ""} 
                                className="py-0.5 px-2 text-[11px] font-medium w-fit"
                              />
                            </td>
                            <td className={`py-3 px-5`}>
                              <Typography className="text-xs font-semibold text-blue-gray-600">
                                {created_date}
                              </Typography>
                            </td>
                            <td className={`py-3 px-5`}>


                              <Link to={`/course_registration/view/${user_id}/${semester}`} className="text-xs font-semibold">
                                <Button color="blue" size='sm'>View</Button>
                              </Link>
                            

                        
                              

                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}
export default RegistrationsList;