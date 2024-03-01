import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import {
    Sidenav,
    DashboardNavbar,
    Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Chip,
} from "@material-tailwind/react";
import {
    HomeIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
function ViewSubadmin() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
    const { id } = useParams();
    const [subadminData, setSubadminData] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSubadmin = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/crsforcu/backend/routes/subadmin_account_api.php?endpoint=get_subadmin&id=${id}`
                );
                if (response.status === 200) {
                    setSubadminData(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
            }
        };
        fetchSubadmin();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {

        return (<div id="alert-4" className="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">
                {error}
            </div>

        </div>
        )
    }
    return (

        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav
                routes={routes}
                brandImg={
                    sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
                }
                activeNav='Sub Admins'
            />
            <div className="p-4 xl:ml-80">
                <DashboardNavbar />
                <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
                    <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
                </div>

                <Card className="mx-3 -mt-56 mb-6 lg:mx-4 border border-blue-gray-100">
                    <CardBody className="p-4">
                        <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center gap-6">

                                { subadminData.gender === "male" ? (
                                    <Avatar
                                        src="../../public/img/default_male_teacher.jpg"
                                        alt="male student"
                                        size="xl"
                                        variant="rounded"
                                        className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                                    />
                                ) :(
                                    <Avatar
                                        src="../../public/img/default_female_teacher.jpg"
                                        alt="female student"
                                        size="xl"
                                        variant="rounded"
                                        className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                                    />
                                ) }

                                <div>
                                    <Typography variant="h5" color="blue-gray" className="mb-1">
                                        {subadminData.name}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        className="font-normal text-blue-gray-600"
                                    >
                                        {subadminData.department}
                                    </Typography>
                                </div>
                            </div>
                            <div className="w-96">
                                <Tabs value="">
                                    <TabsHeader>
                                        <Tab value="back">
                                            <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                            <Link to="/subadmins/view">Back</Link>
                                        </Tab>
                                        <Tab value="edit">
                                            <Link to={`/subadmins/edit/${subadminData.id}`}>
                                                <PencilIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                                                Edit</Link>
                                        </Tab>
                                    </TabsHeader>
                                </Tabs>
                            </div>
                        </div>
                        <div className="gird-cols-1 mb-12 grid  gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                            <ProfileInfoCard
                                title="Profile Information"
                                details={{
                                    ID: subadminData.id,
                                    Name: subadminData.name,
                                    email: subadminData.email,
                                    phone: subadminData.phone,
                                    gender: subadminData.gender,
                                }}
                            />

                            <ProfileInfoCard
                                title=""
                                className="mt-8 w-96"
                                details={{
                                    department: subadminData.department,
                                    role: <Chip variant="gradient" value={subadminData.role_name} color="pink" className="rounded-full" />,
                                    status: subadminData.suspended === 0 ? (
                                        <Chip variant="gradient" value="Active" color="green" className="rounded-full" />
                                    ) : (
                                        <Chip variant="gradient" value="Suspended" color="red" className="rounded-full" />
                                    ),
                                    'created date': subadminData.created_date,
                                }}
                            />
                        </div>

                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default ViewSubadmin;
