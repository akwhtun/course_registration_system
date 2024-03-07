import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import { Input, Select, Option } from '@material-tailwind/react';

import routes from "@/routes";
import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  Button,
  Typography
} from "@material-tailwind/react";
import {
  HomeIcon,
  Cog6ToothIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


function EditPrequisite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [newCourseData, setNewCourseData] = useState();
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/crsforcu/backend/routes/prequisite_course_api.php?endpoint=get_prequisite&id=${id}`
        );
        if (response.status === 200) {
          setNewCourseData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCourse();
  }, [id]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewCourseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleCloseAlert = () => {
    setMessage(null);
  };
  const handleUpdateData = async () => {
    console.log(newCourseData);
    setUpdateLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/crsforcu/backend/routes/prequisite_course_api.php?endpoint=update_prequisite&id=${id}`,
        newCourseData
      );
      if (response.status === 200) {
        // setMessage(response.data.message)
        navigate(`/prequisites/view?update=Course updated successfully`);
        setUpdateLoading(false);

      } else {
        setUpdateLoading(false);
        setMessage(response.data.error);
      }
    } catch (error) {
      setUpdateLoading(false);
      setMessage(error.message);
    }
  };
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

  if (loading) {
    return  <div className="loader-container">
    <div className="loader"></div>
    <div className="loading-text font-semibold">AKWH</div>
  </div>;
  }
  return (

    <div className="min-h-screen bg-blue-gray-50/50">

      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        activeNav='Prequisites Course'
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
          <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
        </div>
        <Card className="mx-3 -mt-56 mb-6 lg:mx-4 border border-blue-gray-100">

          <CardBody className="p-4">
            <div className="mb-5 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center  ">
                <div>
                  {message !== null && (
                    <div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div className="ms-3 text-sm font-medium">
                        {message}
                      </div>
                      <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={() => handleCloseAlert()} aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                      </button>
                    </div>
                  )}


                </div>
              </div>
              <div className="w-96">

                <Tabs value="app">
                  <TabsHeader>
                    <Tab value="back">
                      <Link to={`/prequisites/view`}>
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Back</Link>
                    </Tab>
                   
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid  gap-12 px-4 lg:grid-cols-2">

              <div className='-mt-10 w-full'>

                <Typography variant="h5" color="blue-gray" className="mb-1 text-center">
                  Edit Prequisite
                </Typography>

                <div className="w-full mt-5">
                  <Input label="Course" name="course" defaultValue={newCourseData.course} onChange={handleChange} />
                </div>
                <div className="w-full mt-5">
                  <Input label="Prequisite Course" name="prequisite_course" defaultValue={newCourseData.prequisite_course} onChange={handleChange} />
                </div>
                <Button type="submit" disabled={updateLoading} className="mt-6" fullWidth onClick={handleUpdateData}>
                    {updateLoading ? "Updating..." : "Update"}
                  </Button>
               
              </div>



            </div>

          </CardBody>
        </Card>

      </div>



    </div>
  )
}

export default EditPrequisite;
