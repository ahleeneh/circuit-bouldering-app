import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDashboardPage() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    const getUserDashboard = async () => {
        try {
            const response = await axios.get('http://localhost:8000/dashboard', {
                withCredentials: true
            });
            setAuthenticated(true);
        } catch (error) {
            toast.error('Sorry, you must be logged in to have access to this feature.');
            navigate('/');
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }

    useEffect(() => {
        getUserDashboard();
    }, [])

    return (
        authenticated ? (
            <>
                <h1>User Dashboard</h1>

                <h2>Check Authentication<br/>
                    <button className="button" onClick={getUser}>Submit</button>
                </h2>
            </>

        ) : null
    );

}

export default UserDashboardPage;