import React from 'react';
import {NavLink} from 'react-router-dom';

function NavigationUnauthenticated() {

    return (
        <header className="App-header">
            <nav className="navigation">
                <h1>Circuit</h1>
                <ul className="nav-links">
                    <li>
                        <NavLink to="/">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Register</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );

}

export default NavigationUnauthenticated;

