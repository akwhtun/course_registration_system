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
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Chip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  Cog6ToothIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [studentData, setStudentData] = useState({
    gender: 'female',
    major: 'CS',
    student_year: 'Third Year',
  });

  const [newStudentData, setNewStudentData] = useState();
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/crsforcu/backend/routes/student_account_api.php?endpoint=get_student&id=${id}`
        );
        if (response.status === 200) {
          setStudentData(response.data);
          setNewStudentData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchStudent();
  }, [id]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleCloseAlert = () => {
    setMessage(null);
  };
  const handleSelectChange = (name, value) => {
    setNewStudentData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdateData = async () => {
    setUpdateLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/crsforcu/backend/routes/student_account_api.php?endpoint=update_student&id=${id}`,
        newStudentData
      );
      if (response.status === 200) {
        // response.data.message ? setMessage(response.data.message) : setMessage(response.data.error);
        setMessage(response.data.message)
        navigate(`/students/view?update=Student updated successfully`);
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
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                {studentData.profile === null ?
                  (studentData.gender === 'male' ? (<Avatar
                    src="../../public/img/student_male.jpg"
                    alt="bruce-mars"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />) : (<Avatar
                    src="../../public/img/student_female.jpg"
                    alt="bruce-mars"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />)) : (<Avatar
                    src="../../public/img/student_male.jpg"
                    alt="bruce-mars"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />)}
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
                      <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={() => handleCloseAlert('setError')} aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {studentData.name}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {studentData.major} / {studentData.student_year}
                  </Typography>
                </div>
              </div>
              <div className="w-96">
                <Tabs value="app">
                  <TabsHeader>
                    <Tab value="back">
                      <Link to={`/students/view`}>
                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                        Back</Link>
                    </Tab>
                    <Tab value="students">
                      <Link to={`/students/view`}>
                        <UsersIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                        Students
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
            <div className="gird-cols-1 mb-12 grid  gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">

              <div>
                <div className="w-72 mt-5">
                  <Input label="id" name="id" defaultValue={studentData.id} readOnly />
                </div>
                <div className="w-72 mt-5">
                  <Input label="name" name="name" defaultValue={studentData.name} onChange={handleChange} />
                </div>
                <div className="w-72 mt-5">
                  <Input label="email" name="email" defaultValue={studentData.email} onChange={handleChange} />
                </div>
                <div className="w-72 mt-5">
                  <Input label="phone" name="phone" defaultValue={studentData.phone} onChange={handleChange} />
                </div>
                <div className="w-72 mt-5">
                  <Select
                    name="gender"
                    label="Select Gender"
                    value={studentData.gender || ''}
                    onChange={(value) => handleSelectChange('gender', value)}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                  </Select>

                </div>
                <div className="w-72 mt-5 flex items-center justify-start">
                  <p>Role : </p>  <Chip variant="gradient" value={studentData.role_name} color="blue" className="ms-4 rounded-full" />
                </div>
              </div>

              <div>
                <div className="w-72 mt-5">
                  <Select label="Select Major" name="major" value={studentData.major} onChange={(value) => handleSelectChange('major', value)}>
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Computer Technology">Computer Technology</Option>
                    <Option value="Unchoose">Unchoose</Option>
                  </Select>
                </div>
                <div className="w-72 mt-5">
                  <Select label="Select Year" name="student_year" value={studentData.student_year} onChange={(value) => handleSelectChange('student_year', value)}>
                    <Option value="First Year">First Year</Option>
                    <Option value="Second Year">Second Year</Option>
                    <Option value="Third Year">Third Year</Option>
                  </Select>
                </div>
                <div className="w-72 mt-5 flex items-center justify-start">
                  <p>status : </p> {studentData.suspended === 0 ? (
                    <Chip variant="gradient" value="Active" color="green" className="ms-4 rounded-full" />
                  ) : (
                    <Chip variant="gradient" value="Suspended" color="red" className="ms-4 rounded-full" />
                  )
                  }
                </div>

                <div className="w-72 mt-5">
                  <Input label="Created Date" defaultValue={studentData.created_date} readOnly />
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

export default EditStudent;
