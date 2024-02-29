import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    IconButton,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    CodeBracketSquareIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    PowerIcon,
    Bars2Icon,
    EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { KeyIcon } from "@heroicons/react/24/outline";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        link : "/users/profile",
    },
    {
        label: "Change Password",
        icon: KeyIcon,
        link : "/users/changePassword",
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        link :"/users/logout",
    },
];

function ProfileMenu({user}) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                   {user.gender === "male" ? 
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
                    }
                    <div>
                        <Typography  variant="small" color="gray" className="font-semibold" textGradient>
                            {user.name}
                        </Typography>
                    </div>
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon,link }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                              <Link to={link}>
                              {label}
                              </Link>
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}


// nav list component
const navListItems = [
    {
        label: "Docs",
        icon: CodeBracketSquareIcon,
    },
    {
        label: "Contact",
        icon: EnvelopeIcon,
    },
];

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center ">
            {navListItems.map(({ label, icon }, key) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500"
                >
                    <MenuItem className="flex items-center gap-2 lg:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        <span className="text-gray-900"> {label}</span>
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

function Header() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        if (authUser) {
            setAuthUser(authUser)
        }
    }, [])

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 sticky top-0">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
                >
                    University of Computer Studies
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>

                {authUser !== null ? (<></>) : (<Link to="/users/login" size="sm" variant="text">
                    <Button size="sm">Log In</Button>
                </Link>)}
                {authUser !== null ? (<ProfileMenu  user={authUser}/>) : (<></>)}
            </div>
            <Collapse open={isNavOpen} className="overflow-scroll">
                <NavList />
            </Collapse>
        </Navbar>
    );
}

export default Header;