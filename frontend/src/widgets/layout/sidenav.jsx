import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoHomeOutline } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { PiStudentFill } from "react-icons/pi";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ activeNav }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [navLinks, setNavLinks] = useState([ // Use useState correctly
    {
      id: 1,
      icon: IoHomeOutline,
      name: 'Dashboard',
      isActive: true,
      link: '/',
    },
    {
      id: 2,
      icon: PiStudentFill,
      name: 'Students',
      isActive: false,
      link: '/students/view',
    },
    {
      id: 3,
      icon: FaChalkboardTeacher,
      name: 'Sub Admins',
      isActive: false,
      link: '/subadmins/view',
    },
    {
      id: 4,
      icon: ImBooks,
      name: 'Courses',
      isActive: false,
      link: '/courses/view',
    }
  ]);

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  useEffect(() => {
    setNavLinks(preNavLinks => {
      return preNavLinks.map(link => {
        if (link.name === activeNav) {
          return { ...link, isActive: true }; // Toggle isActive
        }
        return { ...link, isActive: false }; // Reset isActive for other links
      });
    });
  }, activeNav);

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="text-lg"
          >
            Course Registeration System {''}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <Typography
              color="inherit"
              className="font-medium capitalize"
            >
              {/* Empty string passed as children */}
              Admin Control{''}
            </Typography>


          </li>

          {navLinks.map(({ id, icon: Icon, name, link, isActive }) => (
            <li key={id}>
              <Link to={link} >
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={
                    isActive
                      ? sidenavColor
                      : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                  }
                  className="flex items-center gap-4 px-4 capitalize"
                  fullWidth
                >
                  <Icon style={{ fontSize: '24px' }} /> {/* Render the icon component */}
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    {name}
                  </Typography>
                </Button>
              </Link>
            </li>
          ))}

        </ul >
      </div >
    </aside >
  );
}

export default Sidenav;
