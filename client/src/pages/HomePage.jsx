import React from 'react';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../components/LoginForm';

function HomePage() {
    const navigate = useNavigate();

    const login = async (data) => {
        try {
            await axios.post('http://localhost:8000/auth/login', data, {
                withCredentials: true
            });
            toast.success(`Welcome back, ${data.username}!`, {icon: '👋'});
            navigate('/dashboard');
        } catch (error) {
            console.error('An error occurred: ', error);
            toast.error('Sorry, the provided username or password is incorrect.', {icon: '🚫'});
        }
    }

    return (
        <div className="App-main">
            <div className="content">
                <div className="page">

                    <h2>Login</h2>
                    <LoginForm onSubmit={login}/>

                </div>
            </div>
        </div>
    )
}

export default HomePage;