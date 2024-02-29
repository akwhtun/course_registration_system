// React component making a request to PHP endpoint to retrieve session data
import React, { useState, useEffect } from 'react';

function Session() {
    const [sessionData, setSessionData] = useState({});

    useEffect(() => {
        fetch('http://localhost:8000/crsforcu/backend/session.php')
            .then(response => response.json())
            .then(data => setSessionData(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Session Data</h1>
            <p>User ID: {sessionData.userId}</p>
            <p>Username: {sessionData.username}</p>
        </div>
    );
}

export default Session;
