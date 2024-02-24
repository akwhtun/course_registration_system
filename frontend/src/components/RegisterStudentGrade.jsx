import React from 'react';
import { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
function RegisterStudentGrade() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
    const { id } = useParams();
    const { year } = useParams();
    const [formData, setFormData] = useState({
        course_id: "",
        marks: "",
    });
    const [fetchLoading, setFetchLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [studnetData, setStudentData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/crsforcu/backend/routes/student_grade_api.php?endpoint=student_data&id=${id}&year=${year}`
                );

                if (response.status === 200) {
                    setFetchLoading(false);
                    setStudentData(response.data);
                }
            } catch (error) {
                setError(error.message);
                setFetchLoading(false);
            }
        };

        fetchStudentData();
    }, []);
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
        setLoading(true); // Set loading to true when submitting the form
        try {
            const response = await axios.post(
                `http://localhost:8000/crsforcu/backend/routes/student_grade_api.php?endpoint=student_register_grade&id=${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                // response.data.message ? setMessage(response.data.message) : setMessage(response.data.error);
                navigate(`/students/grade/${studnetData[0].user_id}?student_id=${id}&student_year=${year}&register=Grade registered successfully`)
            } else {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    if (error) {
        <div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">
                {error}
            </div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={() => handleCloseAlert()} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    }

    if (fetchLoading) {
        return (
            <div>Loading ....</div>
        )
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
                                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700" onClick={() => handleCloseAlert()} aria-label="Close">
                                        <span className="sr-only">Close</span>
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                    </button>
                                </div>
                            )}


                            <Typography variant="h4" className="font-bold">Register <span className='text-blue-800'>{studnetData[0].user_name}</span>'s Grade</Typography>
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
                                    value={studnetData[0].user_id}
                                    readOnly
                                />
                            </div>
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                    Name
                                </Typography>
                                <Input
                                    size="lg"
                                    name="name"
                                    value={studnetData[0].user_name}
                                    readOnly
                                />
                            </div>
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                    Year
                                </Typography>
                                <Input
                                    size="lg"
                                    name="year"
                                    value={studnetData[0].student_year}
                                    readOnly
                                />
                            </div>
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                    Courses
                                </Typography>
                                <Select label="Select Course" name="course_name" onChange={(value) => handleSelectChange('course_id', value)}>
                                    {studnetData.map(data =>
                                        <Option key={data.id} value={String(data.id)}>{data.course_name}</Option>
                                    )}
                                </Select>
                            </div>
                            <div className="mb-1 flex flex-col gap-6">
                                <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                    Mark
                                </Typography>
                                <Input
                                    size="lg"
                                    name="marks"
                                    type="text"
                                    placeholder="Student's mark..."
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="mt-6" fullWidth>
                                {loading ? "Registering..." : "Register"}
                            </Button>
                        </form>

                    </div>
                </section>

            </div >
        </div >
    );
}
export default RegisterStudentGrade;
