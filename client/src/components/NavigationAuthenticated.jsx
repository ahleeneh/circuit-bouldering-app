import React from 'react';
import {useNavigate} from 'react-router';
import axios from "axios";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

function NavigationAuthenticated() {
    const navigate = useNavigate();

    const logout = async () => {
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

    return (
        <header className="App-header App-header-user">
            <nav className="navigation">
                <h1>Circuit</h1>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sessions">Session History</NavLink>
                    </li>
                    <li>
                        <button className="button button-logout" onClick={logout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );

}

export default NavigationAuthenticated;

