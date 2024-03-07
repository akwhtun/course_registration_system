import React from 'react';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import male from "../../public/img/student_male.jpg";
import female from "../../public/img/student_female.jpg";
const ViewProfile = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        if (authUser) {
            setAuthUser(authUser)
        }
    }, [])
    return (
        <div className='min-h-screen relative'>
            <Header />
            <div className="mt-20 sm:w-3/4 w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col  mx-auto items-center justify-center  py-5" style={{width:"470px"}}>
                <div className="md:flex-shrink-0">
                        {authUser && authUser.gender === "male" ? (
                            <img className="h-48 w-full object-cover md:w-48" 
                            src={male} alt="Profile" />
                        ) : (<img className="h-48 w-full object-cover md:w-48" src={female} alt="Profile" />)}
                    </div>
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold text-center">{authUser && (authUser.role_id === 1 ? 'Admin' : authUser.role_id === 3 ? 'Student' : '')}
                        </div>

                        <div className="mt-4 flex flex-wrap">
                            <span className="text-gray-500 inline-block w-28 ms-5 sm:ms-11">ID:</span>
                            <span className="ml-2 text-black block w-64 ms-5 sm:ms-5">{authUser && authUser.user_id}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                            <span className="text-gray-500 inline-block w-28 ms-5 sm:ms-11">Name:</span>
                            <span className="ml-2 text-black block w-64 ms-5 sm:ms-5">{authUser && authUser.name}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                            <span className="text-gray-500 inline-block w-28 ms-5 sm:ms-11">Email:</span>
                            <span className="ml-2 text-black block w-64 ms-5 sm:ms-5">{authUser && authUser.email}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                            <span className="text-gray-500 inline-block w-28 ms-5 sm:ms-11">Gender:</span>
                            <span className="ml-2 text-black block w-64 ms-5 sm:ms-5">{authUser && authUser.gender}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                            <span className="text-gray-500 inline-block w-28 ms-5 sm:ms-11">Semester:</span>
                            <span className="ml-2 text-black block w-64 ms-5 sm:ms-5">{authUser && authUser.semester}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                            <span className="text-gray-500 inline-block w-28 ms-5 sm:ms-11">Year:</span>
                            <span className="ml-2 text-black block w-64 ms-5 sm:ms-5">{authUser && authUser.student_year}</span>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                            <span className="text-gray-500 inline-block w-28 ms-5 sm:ms-11">Major:</span>
                            <span className="ml-2 text-black block w-64 ms-5 sm:ms-5">{authUser && authUser.major}</span>
                        </div>
                </div>
            </div>
            <div className='absolute bottom-0 left-0 w-screen'>
                <Footer />
            </div>
        </div>
    );
};

export default ViewProfile;
