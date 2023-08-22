import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import SessionTable from "../components/SessionTable";
import SessionCardContainer from '../components/SessionCardContainer';

function UserSessionsPage() {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [authenticated, setAuthenticated] = useState(null);

    const getUserSessions = async () => {
        try {
            console.log('about to fetch a session!!!!! frontend side baby');
            const response = await axios.get('http://localhost:8000/session', {
                withCredentials: true
            });
            console.log(response.data);
            setSessions(response.data);
            setAuthenticated(true);
        } catch (error) {
            console.error('Error fetching user sessions: ', error);
            navigate('/');
        }
    }

    useEffect(() => {
        getUserSessions();
    }, []);

    if (!authenticated) {
        return (
            <div className="App-main">
                <div className="content">
                    <div className="page">
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="App-main">
            <div className="content">
                <div className="page">

                    <h2>User Sessions</h2>
                    <SessionTable sessions={sessions}/>

                    <br/>

                    <SessionCardContainer sessions={sessions}/>

                </div>
            </div>
        </div>
    );

}

export default UserSessionsPage;