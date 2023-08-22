import React from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/register', data, {
                withCredentials: true
            });
            console.log(response);
            toast.success('Registration successful! You can now log in.', {
                icon: '🤝'
            });
            navigate('/');
        } catch (error) {
            console.error('Registration failed: ', error);
            toast.error('Registration failed. The provided email or username is already in use.', {
                icon: '🚫'
            });
        }
    }

    return (
        <div className="App-main">
            <div className="content">
                <div className="page register-page">

                    <h2>Register</h2>
                    <p>Sign up to record your sessions and track your progress.</p>
                    <RegisterForm onSubmit={onSubmit} />

                </div>
            </div>
        </div>

    );

}

export default RegisterPage;