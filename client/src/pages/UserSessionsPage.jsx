import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import SessionTable from "../components/SessionTable";
import SessionCardContainer from '../components/SessionCardContainer';

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import TableRowsRounded from '@mui/icons-material/TableRowsRounded';


function UserSessionsPage() {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [authenticated, setAuthenticated] = useState(null);

    const [selectedView, setSelectedView] = useState('card');

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

    const toggleView = () => {
        setSelectedView(priorView => (priorView === 'card' ? 'table' : 'card'));
    }


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

                    <div className="session-wrapper">
                        <h2>User Sessions</h2>

                        <div className="toggle-view-container">
                            <button
                                className={`button button-view ${selectedView === 'card' ? 'selected' : ''}`}
                                onClick={toggleView}
                            >
                                <GridViewRoundedIcon/>
                            </button>
                            <button
                                className={`button button-view ${selectedView === 'table' ? 'selected' : ''}`}
                                onClick={toggleView}
                            >
                                <TableRowsRounded/>
                            </button>
                        </div>

                    </div>

                    {selectedView === 'table' ? (
                        <SessionTable sessions={sessions}/>
                    ) : (
                        <SessionCardContainer sessions={sessions}/>
                    )}

                </div>
            </div>
        </div>
    );

}

export default UserSessionsPage;