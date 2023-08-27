import React from 'react';
import {NavLink} from "react-router-dom";

function NavigationAuthenticated() {
    return (
        <header className="App-header App-header-user">
            <nav className="navigation">
                <h1>Circuit</h1>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/dashboard">Add Session</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sessions">View Sessions</NavLink>
                    </li>
                    <li>
                        <NavLink to="/account">Manage Account</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );

}

export default NavigationAuthenticated;

