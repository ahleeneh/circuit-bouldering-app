import React, {useState, useEffect} from 'react';
import ChangePasswordForm from '../components/ChangePasswordForm';
import DeleteAccountForm from '../components/DeleteAccountForm';
import axios from "axios";
import {toast} from "react-toastify";

function UserAccountPage() {
    const [displayForm, setDisplayForm] = useState(null);
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

    useEffect(() => {
        getAuthStatus();
        // eslint-disable-next-line
    }, [])

    const handleDisplayForm = (formType) => {
        setDisplayForm(formType);
    };

    const handleCancel = () => {
        setDisplayForm(null);
    }

    if (displayForm === 'changePassword') {
        return (
            <div className="App-main">
                <div className="content">
                    <div className="page">
                        <h2>Change Password</h2>
                        <ChangePasswordForm onCancel={handleCancel}/>
                    </div>
                </div>
            </div>
        )
    }

    if (displayForm === 'deleteAccount') {
        return (
            <div className="App-main">
                <div className="content">
                    <div className="page">
                        <h2>Delete Account</h2>
                        <DeleteAccountForm onCancel={handleCancel}/>
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

                    <div className="account-buttons-container">
                        <button className="button" onClick={() => handleDisplayForm('changePassword')}>
                            Change Password
                        </button>
                        <button className="button" onClick={() => handleDisplayForm('deleteAccount')}>
                            Delete Account
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default UserAccountPage;