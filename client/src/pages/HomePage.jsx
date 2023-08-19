import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
// import {Link} from 'react-router-dom';
// import {useNavigate} from 'react-router';
import axios from 'axios';
// import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {

    
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleError = error => {
        console.error('An error occurred: ', error);
    };

    const register = async () => {
        try {
            const response = await axios.post('http://localhost:8000/register', {
                email: registerEmail,
                username: registerUsername,
                password: registerPassword
            }, {
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            handleError(error);
        }
    }

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
                <h1>Register</h1>
                <input placeholder="email" onChange={e => setRegisterEmail(e.target.value)}/>
                <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)}/>
                <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)}/>
                <button className="button button-register-home" onClick={register}>Submit</button>
            </div>


            <div>
                <h1>Login</h1>
                <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
                <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
                <button className="button button-login" onClick={login}>Submit</button>
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