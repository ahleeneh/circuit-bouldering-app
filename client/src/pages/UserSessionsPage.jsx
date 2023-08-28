import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import SessionTable from "../components/SessionTable";
import SessionDonutChart from "../components/SessionDonutChart";
import SessionBarChart from "../components/SessionBarChart";
import DonutLargeRoundedIcon from '@mui/icons-material/DonutLargeRounded';
import TableRowsRounded from '@mui/icons-material/TableRowsRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

function UserSessionsPage() {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [authenticated, setAuthenticated] = useState(null);
    const [selectedView, setSelectedView] = useState('chart');

    // Function to handle retrieving an authenticated user's sessions
    const getUserSessions = async () => {
        try {
            console.log('about to fetch a session!!!!! frontend side baby');
            const response = await axios.get('http://localhost:8000/session', {
                withCredentials: true
            });
            setSessions(response.data);
            setAuthenticated(true);
        } catch (error) {
            console.error('Error fetching user sessions: ', error);
            navigate('/');
        }
    }

    const handleRefresh = () => {
        getUserSessions();
    };

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

                    <div className="session-wrapper">
                        <h2>View Sessions</h2>


                        <div className="toggle-view-container">
                            <button
                                className="button button-view button-refresh"
                                onClick={() => handleRefresh()}
                            >
                                <RefreshRoundedIcon/>
                            </button>
                            <button
                                className={`button button-view ${selectedView === 'chart' ? 'selected' : ''}`}
                                onClick={() => setSelectedView('chart')}
                            >
                                <BarChartRoundedIcon/>
                            </button>
                            <button
                                className={`button button-view ${selectedView === 'donut' ? 'selected' : ''}`}
                                onClick={() => setSelectedView('donut')}
                            >
                                <DonutLargeRoundedIcon/>
                            </button>
                            <button
                                className={`button button-view ${selectedView === 'table' ? 'selected' : ''}`}
                                onClick={() => setSelectedView('table')}
                            >
                                <TableRowsRounded/>
                            </button>
                        </div>
                    </div>

                    {selectedView === 'table' ? (
                        <SessionTable sessions={sessions} setSessions={setSessions}/>
                    ) : selectedView === 'donut' ? (
                        <SessionDonutChart sessions={sessions}/>
                    ) : (
                        <SessionBarChart sessions={sessions}/>
                    )}

                </div>
            </div>
        </div>
    );

}

export default UserSessionsPage;