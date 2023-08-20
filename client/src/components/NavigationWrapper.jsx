import React, {useState, useEffect} from 'react';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from 'react-router-dom';
import NavigationAuthenticated from './NavigationAuthenticated';
import NavigationUnauthenticated from './NavigationUnauthenticated';

function NavigationWrapper() {
    const [authenticated, setAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        checkAuthStatus();
        console.log('authenticated set to...: ', authenticated);
        // eslint-disable-next-line
    }, [location.pathname]);

    const checkAuthStatus = async () => {
        try {
            console.log('about to try to get auth...');
            // eslint-disable-next-line
            const response = await axios.get('http://localhost:8000/check-auth', {
                withCredentials: true
            });
            setAuthenticated(true);
            console.log('authenticated set to true: ', authenticated);
        } catch (error) {
            setAuthenticated(false);
            console.log('authenticated set to false: ', authenticated);
        }
    };


    return (
        <>
            {authenticated ? (
                <NavigationAuthenticated/>
            ) : (
                <NavigationUnauthenticated/>
            )}
        </>
    );

}

export default NavigationWrapper;