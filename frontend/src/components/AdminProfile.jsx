import React, { useState, useEffect } from 'react';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import admin from "../../public/img/default_admin.png";

const AdminProfile = () => {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
  
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        if (authUser) {
            setAuthUser(authUser)
        }
    }, [])
 
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
    <Sidenav
      routes={routes}
      brandImg={
        sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
      }
      activeNav='dashboard'
    />
    <div className="p-4 xl:ml-80">
      <DashboardNavbar />
      <div className="mt-20 sm:w-3/4 w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex flex-col  mx-auto items-center justify-center  py-5 text-lg" style={{width:"470px"}}>
                <div className="md:flex-shrink-0">
                        {authUser && authUser.gender === "male" ? (
                            <img className="h-48 w-full object-cover md:w-48 border rounded-full border-black border-black-3" 
                            src={admin} alt="Profile" />
                        ) : (<img className="h-48 w-full object-cover md:w-48 border rounded-full border-black border-black-3 " src={admin} alt="Profile" />)}
                    </div>
                        <div className="uppercase tracking-wide text-lg mt-2 text-indigo-500 font-semibold text-center">{authUser && (authUser.role_id === 1 ? 'Admin' : authUser.role_id === 3 ? 'Student' : '')}
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
                       
                </div>
            </div>
    </div>
    </div>
  );
};

export default AdminProfile;
