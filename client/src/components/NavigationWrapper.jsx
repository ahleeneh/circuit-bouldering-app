import React, {useState, useEffect} from 'react';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from 'react-router-dom';
import NavigationAuthenticated from './NavigationAuthenticated';
import NavigationUnauthenticated from './NavigationUnauthenticated';

function NavigationWrapper() {
    const [authenticated, setAuthenticated] = useState(false);
    const location = useLocation();

    const getAuthStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/is-authenticated', {
                withCredentials: true
            });
            setAuthenticated(response.data);
            console.log('[Navigation Wrapper] setAuthenticated: ', authenticated);
        } catch (error) {
            console.error('An error occurred: ', error);
        }
    };

    useEffect(() => {
        getAuthStatus();
        // eslint-disable-next-line
    }, [location.pathname]);


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