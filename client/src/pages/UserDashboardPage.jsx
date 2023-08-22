import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionAddForm from '../components/SessionAddForm';



function UserDashboardPage() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(null);

    const getAuthStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/is-authenticated', {
                withCredentials: true
            });

            if (response.data === true) {
                setAuthenticated(true);
            } else {
                toast.warning('Sorry, you must be logged in to have access to this feature.', {icon: '⚠️'});
                navigate('/');
            }
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/is-authenticated', {
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
        getAuthStatus();
        // eslint-disable-next-line
    }, [])

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

                    <h2>User Dashboard</h2>

                    <h2>Add Session</h2>
                    <SessionAddForm />

                    <p>
                        <button className="button" onClick={getUser}>Check Authentication</button>
                    </p>

                </div>
            </div>
        </div>
    );

}

export default UserDashboardPage;