import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Avatar,
} from "@material-tailwind/react";
import {
  Bars3Icon, UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";
import admin from "../../../public/img/default_admin.png";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdAccountCircle, MdLock, MdExitToApp } from 'react-icons/md';
export function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const authUser = JSON.parse(sessionStorage.getItem('user'));
    if (authUser) {
      setAuthUser(authUser)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          {/* <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div> */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <p
            className="hidden items-center gap-1 px-4 xl:flex normal-case text-black"
          >
            {/* {authUser && authUser.gender === "male" ? 
                   ( <Avatar
                    variant="circular"
                    size="sm"
                    className="border border-gray-900 p-0.5"
                    src="../../public/img/student_male.jpg"
                    alt="male student"
                    
                />) 
                   :
                    ( <Avatar
                        variant="circular"
                        size="sm"
                        className="border border-gray-900 p-0.5"
                        src="../../public/img/student_female.jpg"
                        alt="female student"
                    />)
} */}
            {authUser && <Avatar
              variant="circular"
              size="sm"
              className="border border-gray-900 p-0.5"
              src={admin}
              alt="admin"
            />}
            {authUser && authUser.name}
          </p>

          {/* dropdown */}
          {/* <div className="relative inline-block text-left lg:me-3">
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleDropdown}
              >
                <IoIosArrowDropdown style={{ fontSize: "24px", color: "black", marginRight: "10px" }} />

              </button>
            </div>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-collapse  text-black bg-white z-50">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    className="flex px-4 py-2 text-sm items-center text-gray-500"
                  >
                   My Profile <KeyIcon />
                  </Link>
                  <p
                    className="flex px-4 py-2 text-lg items-center text-green-500"
                  >
                    Approve
                  </p>
                  <p
                    className="flex px-4 py-2 text-lg items-center text-red-500"
                  >
                    Reject
                  </p>
                </div>
              </div>
            )}
          </div> */}
       <div className="relative inline-block text-left lg:me-3">
  <div className="flex items-center">
    <button
      type="button"
      onClick={toggleDropdown}
      className="cursor-pointer"
    >
      <IoIosArrowDropdown style={{ fontSize: "24px", color: "black", marginRight: "10px", cursor:"pointer"}} />
    </button>
  </div>
  {isOpen && (
    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-collapse text-black bg-white z-50">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <Link to="/admin/profile"
          className="flex px-4 py-2 text-base items-center "
        >
          <MdAccountCircle style={{ fontSize: "24px", marginRight: "10px" }} /> My Profile 
        </Link>
        <Link to="/admin/changePassword"
          className="flex px-4 py-2 text-base items-center "
        >
        <MdLock style={{ fontSize: "24px", marginRight: "10px" }} /> Change Password 
        </Link>
        <Link to="/admin/logout"
          className="flex px-4 py-2 text-base items-center "
        >
           <MdExitToApp style={{ fontSize: "24px", marginRight: "10px" }} /> Logout
        </Link>
      </div>
    </div>
  )}
</div>

        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
