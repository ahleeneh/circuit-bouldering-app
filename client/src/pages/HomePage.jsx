import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();
    
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleError = error => {
        console.error('An error occurred: ', error);
    };

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login', {
                username: loginUsername,
                password: loginPassword
            }, {
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            handleError(error)
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            handleError(error)
        }
    }

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/logout', null, {
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            handleError(error)
        }
    }

    return (
        <div className="page">
            <h2>Circuit Bouldering App</h2>
            <p>lorem ipsum</p>

            <div>
                <h1>Login</h1>
                <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
                <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
                <button className="button button-login" onClick={login}>Submit</button>
                <Link to="/register">
                    <button className="button">Register</button>
                </Link>
            </div>

            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
            </div>

            <div>
                <h1>Log Out</h1>
                <button onClick={logout}>Submit</button>
            </div>

        </div>
    )
}

export default HomePage;