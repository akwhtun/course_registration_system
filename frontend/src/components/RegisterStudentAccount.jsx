import React from 'react';
import { useState } from 'react';
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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function RegisterStudentAccount() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    major: "",
    semester : "",
    year: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
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
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true); // Set loading to true when submitting the form
    try {
      const response = await axios.post(
        'http://localhost:8000/crsforcu/backend/routes/student_account_api.php?endpoint=student_register_account',
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // response.data.message ? setMessage(response.data.message) : setMessage(response.data.error);
        navigate('/students/view?register=Student registered successfully')
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (



    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
        activeNav='Student Register'
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <section className="m-7 flex ">
          <div className="w-full lg:w-5/5 flex flex-col items-center justify-center">
            <div className="text-center">
              {message && (
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


              <Typography variant="h2" className="font-bold">Register Student</Typography>
            </div>

            <form className="mt-6 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  ID Number
                </Typography>
                <Input
                  size="lg"
                  name="id"
                  type="text"
                  placeholder="Student's ID..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Name
                </Typography>
                <Input
                  size="lg"
                  name="name"
                  type="text"
                  placeholder="Student's Name..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Email
                </Typography>
                <Input
                  size="lg"
                  name="email"
                  type="email"
                  placeholder="....@cuspkku.edu.mm"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Phone
                </Typography>
                <Input
                  size="lg"
                  name="phone"
                  type="tel"
                  placeholder="Student's Phone..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Gender
                </Typography>
                <Select label="Select Gender" name="gender" onChange={(value) => handleSelectChange('gender', value)}>
                  <Option value='male'>Male</Option>
                  <Option value='female'>Female</Option>
                </Select>
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Course Major
                </Typography>
                <Select label="Select Major" name="major" onChange={(value) => handleSelectChange('major', value)}>
                  <Option value='Computer Science'>Computer Science</Option>
                  <Option value='Computer Technology'>Computer Technology</Option>
                  <Option value='Computer Science and Computer Technology'>Computer Science and Computer Technology</Option>

                </Select>
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Course Semester
                </Typography>
                <Select label="Select Semester" name="semester" onChange={(value) => handleSelectChange('semester', value)}>
                  <Option value='Semester I'>Semester I</Option>
                  <Option value='Semester II'>Semester II</Option>
                  <Option value='Semester III'>Semester III</Option>
                  <Option value='Semester IV'>Semester IV</Option>
                  <Option value='Semester V'>Semester V</Option>
                  <Option value='Semester VI'>Semester VI</Option>

                </Select>
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                  Course Year
                </Typography>
                <Select label="Select Year" name="year" onChange={(value) => handleSelectChange('year', value)}>
                  <Option value='First Year'>First Year</Option>
                  <Option value='Second Year'>Second Year</Option>
                  <Option value='Third Year'>Third Year</Option>

                </Select>
              </div>
              <Button type="submit" disabled={loading} className="mt-6" fullWidth>
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

          </div>
        </section>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default RegisterStudentAccount;
