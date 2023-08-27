import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import axios from "axios";
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import DeleteAccountForm from '../components/DeleteAccountForm';
import {toast} from "react-toastify";

function UserAccountPage() {
    const navigate = useNavigate();
    const [displayForm, setDisplayForm] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    const getUsername = async() => {
        try {
            const response = await axios.get('http://localhost:8000/auth/current-user', {
                withCredentials: true
            })
            setUsername(response.data.username);
            setAuthenticated(true);
        } catch (error) {
            setUsername(null);
            setAuthenticated(false);
            toast.warning('Sorry, you must be logged in to have access to this feature.', {icon: '⚠️'});
            navigate('/');
            console.error(error);
        }
    }

    const logoutUser = async () => {
        try {
            await axios.post('http://localhost:8000/auth/logout', null, {
                withCredentials: true
            });
            toast.info('Goodbye!', {icon: '👋'});
            navigate('/');
        } catch (error) {
            console.error('An error occurred: ', error);
            toast.info('No one is logged in!', {icon: '🧐'});
        }
    }

    useEffect(() => {
        getUsername();
        // eslint-disable-next-line
    }, [])

    const handleDisplayForm = (formType) => {
        setDisplayForm(formType);
    };

    const handleCancel = () => {
        setDisplayForm(null);
    }

    if (!authenticated) {
        return (
            <div className="App-main">
                <div className="content">
                    <div className="page">
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="App-main">
            <div className="content">
                <div className="page">

                    <h2>Manage Account</h2>

                    {displayForm === 'updatePassword' ? (
                        <UpdatePasswordForm onCancel={handleCancel} username={username}/>
                    ) : displayForm === 'deleteAccount' ? (
                        <DeleteAccountForm onCancel={handleCancel}/>
                    ) : (
                        <div className="account-buttons-container">
                            <button className="button" onClick={() => handleDisplayForm('updatePassword')}>
                                Update Password
                            </button>
                            <button className="button" onClick={() => handleDisplayForm('deleteAccount')}>
                                Delete Account
                            </button>
                            <button className="button button-logout" onClick={logoutUser}>Logout</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );

}

export default UserAccountPage;