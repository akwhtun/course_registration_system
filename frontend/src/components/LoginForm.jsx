import React, { useState } from 'react';
import { Button, Input, Typography } from '@material-tailwind/react';
import Header from './Header';
import Footer from './Footer';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., validate input, send data to server, etc.)
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center  bg-lightBlue-500" style={{ height: '84.8vh' }}>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-28">
                    <Typography as="h2" color="lightBlue" className="text-3xl font-bold mb-6 text-center">Login</Typography>
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <Input
                            type="email"
                            color="lightBlue"
                            size="regular"
                            outline={false}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            color="lightBlue"
                            size="regular"
                            outline={false}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" color="lightBlue" ripple="light" block>Login</Button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginForm;