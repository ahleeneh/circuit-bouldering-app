import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {

    return (
        <nav className="navigation">
            <h1>Circuit</h1>

            <ul className="nav-links">
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {/*<li>*/}
                {/*    <NavLink to="/register">Register</NavLink>*/}
                {/*</li>*/}
            </ul>

        </nav>
    );

}

export default Navigation;