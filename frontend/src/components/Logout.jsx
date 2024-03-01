import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.removeItem("user");

        navigate("/");
    }, [navigate]);

    return (
        <>
            {/* Any JSX content or components can be placed here */}
        </>
    );
}

export default Logout;

