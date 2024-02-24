import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
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
function StudentList() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;

    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const updateParam = queryParams.get('update');
    const registerParam = queryParams.get('register');
    const student_id = queryParams.get('student_id');
    const student_year = queryParams.get('student_year');
    //get students list from database
    const [studentData, setStudentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [updateAlert, setUpdateAlert] = useState(updateParam);
    const [registerAlert, setRegisterAlert] = useState(registerParam);

    useEffect(() => {
        const fetchStudentGrade = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/crsforcu/backend/routes/student_grade_api.php?endpoint=student_grades_list&id=${id}`
                );

                if (response.status === 200) {
                    setStudentData(response.data);
                    setLoading(false);
                } else {
                    setLoading(false)
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchStudentGrade();
    }, []);
    console.log(studentData);
    const handleCloseAlert = () => {
        setUpdateAlert(null);
        setRegisterAlert(null);
        setMessage(null);
    };

    const deleteGrade = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this grade?");
        if (!confirmDelete) {
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:8000/crsforcu/backend/routes/student_grade_api.php?endpoint=delete_grade&id=${id}`
            );
            if (response.status === 200) {
                response.data.message ? setMessage(response.data.message) : setMessage(response.data.error);
                setStudentData(studentData.filter((data) => data.id !== id));
            }
        } catch (error) {
            setMessage(error.message);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
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
                />
                <div className="p-4 xl:ml-80">
                    <DashboardNavbar />
                    <div className="mt-12 mb-8 flex flex-col gap-12 ">

                        <Link to={`/grades/create/${student_id}/${student_year}`} className="text-xs font-semibold">
                            <Button color="yellow" size='sm' className='ms-2'>Edit</Button>
                        </Link>
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
                            {registerAlert && (
                                <div className="px-6">
                                    <div id="alert-1" className="flex items-center p-4 my-2 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div className="ms-3 text-sm font-medium">
                                            {registerAlert}
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
                                    {studentData.length > 0 ? studentData[0].user_name : 'Student'}'s Grades
                                </Typography>
                            </CardHeader>

                            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                                <table className="w-full min-w-[640px] table-auto">
                                    <thead>
                                        <tr>
                                            {["students", "course_name", "marks", "letter grade", "grade score", "remark", ""].map((el, index) => (
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
                                        {studentData.length > 0 ? (

                                            studentData.map(
                                                ({ id, major, student_year, course_name, course_id, marks, letter_grade, grade_score, remark, user_name, user_id, student_id }) => {
                                                    const className = `py-3 px-5 ${id === studentData.length - 1
                                                        ? ""
                                                        : "border-b border-blue-gray-50"
                                                        }`;

                                                    return (
                                                        <tr key={id}>
                                                            <td className={className}>
                                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                                    {student_year} / {major}
                                                                </Typography>
                                                            </td>
                                                            <td className={`py-3 px-5`}>
                                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                                    {course_name}
                                                                </Typography>
                                                            </td>
                                                            <td className={`py-3 px-5`}>
                                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                                    <div
                                                                        className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900 w-16 text-center">
                                                                        <span className="">{marks}</span>
                                                                    </div>
                                                                </Typography>
                                                            </td>
                                                            <td className={`py-3 px-5`}>
                                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                                    <Chip variant="gradient" value={letter_grade} color="gray" className="rounded-full w-20 text-center" />
                                                                </Typography>
                                                            </td>
                                                            <td className={`py-3 px-5`}>
                                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                                    <div
                                                                        className="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900 w-16 text-center">
                                                                        <span className="">{grade_score.toFixed(1)}</span>
                                                                    </div>
                                                                </Typography>
                                                            </td>
                                                            <td className={`py-3 px-5`}>
                                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                                    {remark === "Pass" ? (
                                                                        <Chip variant="gradient" value={remark} color="green" className="rounded-full w-14 text-center
                                                                    "
                                                                            size='sm' />
                                                                    ) : (
                                                                        <Chip variant="gradient" value={remark} color="red" className="rounded-full w-14 text-center
                                                                    "
                                                                            size='sm' />
                                                                    )}
                                                                </Typography>
                                                            </td>
                                                            <td className={`py-3 px-5`}>
                                                                <Link to={`/grades/edit/${id}?course_id=${course_id}&marks=${marks}&student_name=${user_name}&user_id=${user_id}&student_id=${student_id}&student_year=${student_year}`} className="text-xs font-semibold">
                                                                    <Button color="yellow" size='sm' className='ms-2'>Edit</Button>
                                                                </Link>


                                                                <Button color="red" size='sm' className='ms-2' onClick={() => deleteGrade(id)}>Delete</Button>

                                                            </td>

                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : ""}
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
export default StudentList;