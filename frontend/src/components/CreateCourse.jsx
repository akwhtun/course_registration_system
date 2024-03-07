import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import {
  Input,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Link } from "react-router-dom";
import axios from 'axios';

function CreateCourse() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const [formData, setFormData] = useState({
    'course_code': "",
    'course_name': "",
    'course_year': "",
    'semester': "",
    'major': "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };
  const handleSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCloseAlert = () => {
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/crsforcu/backend/routes/course_api.php?endpoint=create_course",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          }
        });
      if (response.status === 200) {
        navigate('/courses/view?create=course registered successfully')
      } else {
        response.data.error ? setError(response.data.error) : setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        activeNav='Courses'
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <section className="m-7 flex ">
          <Link to="/courses/view">
          <MdOutlineKeyboardBackspace style={{ fontSize: '24px' }}/>
          </Link>
          <div className="w-full lg:w-5/5 flex flex-col items-center justify-center">
            <div className="text-center">
              {error && (
                <div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ms-3 text-sm font-medium">
                    {error}
                  </div>
                  <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={() => handleCloseAlert('setError')} aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
              )}


              <Typography variant="h2" className="font-bold">
                Create Course
              </Typography>
            </div>

            <form className="mt-6 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Couser Code
                </Typography>
                <Input
                  size="lg"
                  name="course_code"
                  type="text"
                  placeholder="Course's Code..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Couser Name
                </Typography>
                <Input
                  size="lg"
                  name="course_name"
                  type="text"
                  placeholder="Course's Name..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Semester
                </Typography>
                <Select label="Select Semester" name="semester" onChange={(value) => handleSelectChange('semester', value)}>
                  <Option value='Semester I'>Semester I</Option>
                  <Option value='Semester II'>Semester II</Option>
                  <Option value='Semester III'>Semester III</Option>
                  <Option value='Semester IV'>Semester IV</Option>
                  <Option value='Semester V'>Semester V</Option>
                  <Option value='Semester VI'>Semester VI</Option>
                  <Option value='Semester VII'>Semester VII</Option>
                  <Option value='Semester VIII'>Semester VIII</Option>
                  <Option value='Semester XI'>Semester XI</Option>
                  <Option value='Semester X'>Semester X</Option>

                </Select>
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Course Year
                </Typography>
                <Select label="Select Year" name="course_year" onChange={(value) => handleSelectChange('course_year', value)}>
                  <Option value='First Year'>First Year</Option>
                  <Option value='Second Year'>Second Year</Option>
                  <Option value='Third Year'>Third Year</Option>
                  <Option value='Fourth Year'>Fourth Year</Option>
                  <Option value='Fifth Year'>Fifth Year</Option>

                </Select>
              </div>

              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Course Major
                </Typography>
                <Select label="Select Major" name="course_year" onChange={(value) => handleSelectChange('major', value)}>
                  <Option value='Computer Science'>Computer Science</Option>
                  <Option value='Computer Technology'>Computer Technology</Option>
                  <Option value='Computer Science and Computer Technology'>Computer Science and Computer Technology</Option>

                </Select>
              </div>

              <Button type="submit" disabled={loading} className="mt-6" fullWidth>
                {loading ? "Creating..." : "Create"}
              </Button>
            </form>

          </div>
        </section>
      </div>
    </div>
  );
}
export default CreateCourse;
