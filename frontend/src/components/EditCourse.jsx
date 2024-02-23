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


function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [courseData, setCourseData] = useState({
    course_year: 'First Year',
    semester: 'Semester I',
  });

  const [newCourseData, setNewCourseData] = useState();
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/crsforcu/backend/routes/course_api.php?endpoint=get_course&id=${id}`
        );
        if (response.status === 200) {
          setCourseData(response.data);
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

  const handleSelectChange = (name, value) => {
    setNewCourseData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCloseAlert = () => {
    setMessage(null);
  };
  const handleUpdateData = async () => {
    console.log(newCourseData);
    setUpdateLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/crsforcu/backend/routes/course_api.php?endpoint=update_course&id=${id}`,
        newCourseData
      );
      if (response.status === 200) {
        // setMessage(response.data.message)
        navigate(`/courses/view?update=Course updated successfully`);
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
    return <div>Loading...</div>;
  }
  return (

    <div className="min-h-screen bg-blue-gray-50/50">

      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
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
                      <Link to={`/courses/view`}>
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Back</Link>
                    </Tab>
                    <Tab value="students">
                      <Link to={`/students/view`}>
                        <UsersIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                        Courses
                      </Link>
                    </Tab>


                    <Tab value="settings">
                      <Link to="/students/edit/:id">
                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Edit</Link>
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid  gap-12 px-4 lg:grid-cols-2">

              <div className='-mt-10 w-full'>

                <Typography variant="h5" color="blue-gray" className="mb-1 text-center">
                  Edit Course
                </Typography>

                <div className="w-full mt-5">
                  <Input label="Course Code" name="course_code" defaultValue={courseData.course_code} onChange={handleChange} />
                </div>
                <div className="w-full mt-5">
                  <Input label="Course Name" name="course_name" defaultValue={courseData.course_name} onChange={handleChange} />
                </div>
                <div>
                  <div className="w-full mt-5">
                    <Select label="Select Semester" name="semester" value={courseData.semester || ''} onChange={(value) => handleSelectChange('semester', value)}>
                      <Option value='Semester I'>Semester I</Option>
                      <Option value='Semester II'>Semester II</Option>
                      <Option value='Semester III'>Semester III</Option>
                      <Option value='Semester IV'>Semester IV</Option>
                      <Option value='Semester V'>Semester V</Option>
                      <Option value='Semester VI'>Semester VI</Option>
                    </Select>
                  </div>
                  <div className="w-full mt-5">
                    <Select
                      name="Course Year"
                      label="Select Year"
                      value={courseData.course_year || ''}
                      onChange={(value) => handleSelectChange('course_year', value)}
                    >
                      <Option value="First Year">First Year</Option>
                      <Option value="Second Year">Second Year</Option>
                      <Option value="Third Year">Third Year</Option>
                    </Select>

                  </div>
                  <div className="w-full mt-5">
                    <Input label="Created Date" defaultValue={courseData.created_date} readOnly />
                  </div>
                  <Button type="submit" disabled={updateLoading} className="mt-6" fullWidth onClick={handleUpdateData}>
                    {updateLoading ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>



            </div>

          </CardBody>
        </Card>

      </div>



    </div>
  )
}

export default EditCourse;
