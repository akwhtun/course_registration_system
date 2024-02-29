import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Typography, Button } from '@material-tailwind/react';
import banner from "../../public/img/banner.jpg";

function UserPanel() {
    return (
        <>
            <Header />
            <div className='mb-3'>
                <div className="bg-cover bg-center h-96 flex items-center justify-center">
                    <img src={banner} alt="Banner" />
                </div>

                <div className="container mx-auto mt-16 px-4"> {/* Added px-4 for padding */}
                    <Typography as="h2" color="blue-gray" className="text-3xl font-bold mb-6">
                        Welcome to the Computer University Course Registration System
                    </Typography>
                    <Typography color="blue-gray" className="text-lg mb-6">
                        At Computer University, we offer a wide range of courses designed to equip students with the knowledge and skills needed to succeed in the dynamic field of computer science and technology. Our course registration system provides an intuitive and efficient way for students to explore available courses, register for classes, and manage their academic journey.
                    </Typography>
                    <Typography color="blue-gray" className="text-lg mb-6">
                        Explore our courses, effortlessly register for classes, and join our supportive learning environment to unlock your full potential in the ever-evolving field of technology.
                    </Typography>
                    <Button color="gray">Get Started</Button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserPanel;
