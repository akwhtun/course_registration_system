import React from 'react'; 
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import {
    Input,
  Checkbox,
    Radio,
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

function RegisterStudentAccount() {
    const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const [formData, setFormData] = useState({
    id : "",
    name: "",
    email: "",
    phone: "",
    gender : "",
    year: "",
    major : "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
const [open, setOpen] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
        const {name, value } = e.target;
        name === "year" ? setSelectedYear(value) : setSelectedGender(value);
        setFormData(prevFormData => ({
           ...prevFormData,
      [name]: value,
        }));
    }

    const handleRadioClick = (e) => {
        const { value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            major: value
        }));
  }

  const handleCloseAlert = (msg) => {
  msg === 'setError' ? setError(null) : setMessage(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        response.data.message ? setMessage(response.data.message) : setMessage(response.data.error);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  
    const [selectedYear, setSelectedYear] = useState(null);
    const years = [
        { name: 'First Year', value: 'First Year' },
        { name: 'Second Year', value: 'Second Year' },
        { name: 'Third Year', value: 'Third Year' },
  ];
  
    const [selectedGender, setSelectedGender] = useState(null);
    const gender = [
        { name: 'Male', value: 'male' },
        { name: 'Female', value: 'female' },
    ];
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
        <section className="m-7 flex ">
          <div className="w-full lg:w-5/5 flex flex-col items-center justify-center">
            <div className="text-center">
           {error !== null && (
        <div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            {error}
          </div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={() => handleCloseAlert('setError')} aria-label="Close">
                    <span className="sr-only">Close</span>
                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
             {message !== null && (
        <div id="alert-1" className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            {message}
          </div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" onClick={() =>handleCloseAlert('setMessage')} aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
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
              Choose Year
            </Typography>
    
        <div className="card flex justify-content-center p-2 rounded-md border border-blue-gray-200 focus:border-black">
            <Dropdown name="year" value={selectedYear} onChange={(e) => handleSelectChange(e)} options={years} optionLabel="name" 
                placeholder="Select Year" className="w-full md:w-14rem" />
        </div>        
              </div>  
              <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
              Major
            </Typography>
               <div className="flex items-center">
                   <div className="flex items-center">
                     <Radio
              size="lg"
                      name="Major"
                      value="CS"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
                      }}
                      onClick={(e) => handleRadioClick(e)}
                  />
                   <Typography variant="small" color="blue-gray" className=" font-medium">
              CS
            </Typography>
                </div>
                 <div className="flex items-center">
               </div>
                     <Radio
              size="lg"
                    name="Major"
                    value="CT"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
                    }}
                    onClick={(e) => handleRadioClick(e)}
                  />
                   <Typography variant="small" color="blue-gray" className=" font-medium">
              CT
            </Typography>
             </div>
               
              </div>
             
                <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
              Gender
            </Typography>
                       <div className="card flex justify-content-center p-2 rounded-md border border-blue-gray-200 focus:border-black">
            <Dropdown name="gender" value={selectedGender} onChange={(e) => handleSelectChange(e)} options={gender} optionLabel="name" 
                placeholder="Select Gender" className="w-full md:w-14rem" />
        </div>        
              </div>  
          <Button type="submit" disabled={loading} className="mt-6" fullWidth>
            {loading ? "Loading..." : "Register"}
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
