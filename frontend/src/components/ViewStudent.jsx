import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
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
} from "@material-tailwind/react";
import {
  HomeIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
function ViewStudent() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { id } = useParams();
  const [studentData, setStudentData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/crsforcu/backend/routes/student_account_api.php?endpoint=get_student&id=${id}`
        );
        if (response.status === 200) {
          setStudentData(response.data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCourse();
  }, [id]);

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
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        activeNav='Students'
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
             { studentData.gender === 'male' ? (<Avatar
                    src="../../public/img/student_male.jpg"
                    alt="male student"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />) : (<Avatar
                    src="../../public/img/student_female.jpg"
                    alt="female student"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                  />)}
                <div>
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
                <Tabs value="">
                  <TabsHeader>
                    <Tab value="back">
                      <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                      <Link to="/students/view">Back</Link>
                    </Tab>
                    <Tab value="edit">
                      <Link to={`/students/edit/${studentData.id}`}>
                        <PencilIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                        Edit</Link>
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid  gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              <ProfileInfoCard
                title="Profile Information"
                details={{
                  ID: studentData.id,
                  Name: studentData.name,
                  email: studentData.email,
                  phone: studentData.phone,
                  gender: studentData.gender,
                  role: <Chip variant="gradient" value={studentData.role_name} color="blue" className="rounded-full" />
                }}
              />

              <ProfileInfoCard
                title=""
                className="mt-8 capitalize"
                details={{
                  major: studentData.major,
                  semester: studentData.semester,
                  year: studentData.student_year,
                  status: studentData.suspended === 0 ? (
                    <Chip variant="gradient" value="Active" color="green" className="rounded-full" />
                  ) : (
                    <Chip variant="gradient" value="Suspended" color="red" className="rounded-full" />
                  ),
                  'created date': studentData.created_date,

                }}
              />



              {/* <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Platform Settings
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div> */}
            </div>

          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ViewStudent;
