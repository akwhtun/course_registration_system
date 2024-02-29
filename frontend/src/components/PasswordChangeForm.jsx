import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Typography } from '@material-tailwind/react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

function PasswordChangeForm() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = JSON.parse(sessionStorage.getItem('user'));
        if (authUser) {
            setAuthUser(authUser)
        }
    }, [])

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
                `http://localhost:8000/crsforcu/backend/routes/auth_api.php?endpoint=changePassword&user_id=${authUser.user_id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setMessage(response.data.message);
                navigate('/');
            } else {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center" style={{ height: '84.8vh' }}>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-28">
                    {message && <Typography color="red" className='text-center mb-2 font-medium'>{message}</Typography>}
                    <Typography as="h2" color="gray" className="text-3xl font-bold mb-6 text-center">Change Password</Typography>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <Input
                            type="password"
                            name="currentPassword"
                            color="gray"
                            size="md"
                            placeholder="Current Password"
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            name="newPassword"
                            color="gray"
                            size="md"
                            placeholder="New Password"
                            onChange={handleChange}
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            color="gray"
                            size="md"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                        />
                        <Button type="submit" color="gray" disabled={loading}>{loading ? 'Loading...' : 'Change Password'}</Button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PasswordChangeForm;
