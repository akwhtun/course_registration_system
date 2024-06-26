import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaClockRotateLeft } from 'react-icons/fa6';
import {  useLocation } from 'react-router-dom';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Button,
  timeline,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
function ModifyRegisterDate() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const [date, setDate] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const updateParam = queryParams.get('update');
  const [updateMessage, setUpdateMessage] = useState(updateParam)

  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/crsforcu/backend/routes/date_api.php?endpoint=get_date"
        );
        if (response.status === 200) {
          setDate(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchDate();
  }, []);

  const handleCloseAlert = () => {
    setUpdateMessage(null);
    setMessage(null);
  };

//   console.log(date);
  if (loading) {
    return <div className="loader-container">
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
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        activeNav='Registration Date'
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Link to="/date/update">
        <Button variant="gradient" color="blue" size="sm" className='flex items-center justify-center'><FaClockRotateLeft style={{ fontSize: '20px', marginRight: '10' }} />Update Date</Button></Link>
        <div className="mt-5 mb-8 flex flex-col gap-12 ">
          <Card>
            {updateMessage && (
              <div className="px-6">
                <div id="alert-1" className="flex items-center p-4 my-2 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ms-3 text-sm font-medium">
                    {updateMessage}
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
         
            {message && (
              <div className="px-6">
                <div id="alert-1" className="flex items-center p-4 my-2 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ms-3 text-sm font-medium">
                    {message}
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
                Modify Register Date
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    {["Start Date", "End Date"].map((el, index) => (
                      <th
                        key={index}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left text-xs"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400 text-xs"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                 
                        <tr>
                          <td className={`py-3 px-5`}>
                            <Typography className="text-lg font-semibold text-blue-gray-600">
                              {date.start_date}
                            </Typography>
                          </td>
                          <td className={`py-3 px-5`}>
                            <Typography className="text-lg font-semibold text-blue-gray-600">
                              {date.end_date}
                            </Typography>
                          </td>
                          
                        </tr>
                      
                    
                  
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ModifyRegisterDate;
