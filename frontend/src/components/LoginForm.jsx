import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography } from '@material-tailwind/react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
   
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const successParam = queryParams.get('success');
    const [successMessage, setSuccessMessage] = useState(successParam);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8000/crsforcu/backend/routes/auth_api.php?endpoint=login',
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.status === 200) {
                const responseData = response.data;
                console.log(responseData.role_id);
                console.log(responseData.message);
                console.log(responseData.message == "changePassword");
                if (responseData.message == "changePassword") {
                   
                    const user = {
                        logged: true,
                        user_id: responseData.user_id,
                        role_id: responseData.role_id,
                        name: responseData.name,
                        email: responseData.email,
                        gender: responseData.gender
                    };
                    sessionStorage.setItem('user', JSON.stringify(user));
                   if(responseData.role_id == 3){
                    navigate("/users/changePassword");
                   }
                   if(responseData.role_id == 1){
                    navigate("/admin/changePassword");
                   }

                } else {
                    
                    if(responseData.role_id == 3){
                        const user = {
                            logged: true,
                            user_id: responseData.id,
                            role_id: responseData.role_id,
                            name: responseData.name,
                            email: responseData.email,
                            gender: responseData.gender,
                            semester : responseData.semester,
                            major : responseData.major,
                            student_year : responseData.student_year
                        };
                        sessionStorage.setItem('user', JSON.stringify(user));
                        navigate("/");
                    }
                    if(responseData.role_id == 2){
                        const user = {
                            logged: true,
                            user_id: responseData.id,
                            role_id: responseData.role_id,
                            name: responseData.name,
                            email: responseData.email,
                            gender: responseData.gender,
                            department : responseData.department,
                        };
                        sessionStorage.setItem('user', JSON.stringify(user));
                        navigate("/");
                    }
                    if(responseData.role_id == 1){
                        const user = {
                            logged: true,
                            user_id: responseData.id,
                            role_id: responseData.role_id,
                            name: responseData.name,
                            email: responseData.email,
                            gender: responseData.gender,
                        };
                        sessionStorage.setItem('user', JSON.stringify(user));
                        navigate("/dashboard");
                    }
                }
            } else {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='min-h-screen relative'>
            <Header />
            <div className="flex flex-col items-center" style={{ height: '84.8vh' }}>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-28">
                    {message && <Typography as="p" color="red" className='text-center mb-2 font-bold'>{message}</Typography>}
                    {successMessage && <Typography as="p" color="green" className='text-center mb-2 font-bold'>{successMessage}</Typography>}
                    <Typography as="h2" color="gray" className="text-3xl font-bold mb-6 text-center">Login</Typography>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <Input
                            type="email"
                            name="email"
                            color="gray"
                            size="md"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            color="gray"
                            size="md"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        <Button type="submit" color="gray" disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
                    </form>
                </div>
            </div>
           <div className='absolute bottom-0 left-0 w-full'>
           <Footer />
           </div>
        </div>
    );
}

export default LoginForm;
