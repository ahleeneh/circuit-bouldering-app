import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDashboardPage() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    const getUserDashboard = async () => {
        try {
            const response = await axios.get('http://localhost:8000/check-auth', {
                withCredentials: true
            });
            setAuthenticated(true);
            console.log(response);
        } catch (error) {
            toast.warning('Sorry, you must be logged in to have access to this feature.', {
                icon: '⚠️'
            });
            navigate('/');
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/check-auth', {
                withCredentials: true
            });
            console.log(response);
            toast.success('Authenticated!');
        } catch (error) {
            console.error('An error occurred: ', error);
            toast.error('Not authenticated!')
        }
    }

    useEffect(() => {
        getUserDashboard();
        // eslint-disable-next-line
    }, [])

    return (
        authenticated ? (
            <div className="App-main">
                <div className="content">

                    <div className="page">
                    <h2>User Dashboard</h2>
                        <p>
                            <button className="button" onClick={getUser}>Check Authentication</button>
                        </p>
                    </div>

                </div>
            </div>
        ) : null
    );

}

export default UserDashboardPage;