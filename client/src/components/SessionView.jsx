import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SessionView() {
    const [ sessions, setSessions ] = useState([]);

    useEffect(() => {
        fetchUserSessions();
    }, []);

    const fetchUserSessions = async () => {
        try {
            console.log('about to fetch a session!!!!! frontend side baby');
            const response = await axios.get('http://localhost:8000/session', {
                withCredentials: true
            });
            console.log(response.data);
            setSessions(response.data);
        } catch (error) {
            console.error('Error fetching user sessions: ', error);
        }
    }

    return (
        <>
            <h3>User Sessions</h3>

            <ul>
                {sessions.map(session => (
                    <li key={session.id}>
                        Date: {session.date},
                        Red: {session.red}
                    </li>
                    ))}
            </ul>
        </>
    );

}

export default SessionView;