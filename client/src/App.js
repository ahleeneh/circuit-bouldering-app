import React, {useState} from 'react';
import axios from 'axios';

function App() {
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

    // const register = () => {
    //     axios({
    //         method: 'POST',
    //         data: {
    //             username: registerUsername,
    //             password: registerPassword
    //         },
    //         withCredentials: true,
    //         url: 'http://localhost:8000/register',
    //     }).then(res => console.log(res));
    // };

    const login = async() => {
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

    // const login = () => {
    //     axios({
    //         method: 'POST',
    //         data: {
    //             username: loginUsername,
    //             password: loginPassword
    //         },
    //         withCredentials: true,
    //         url: 'http://localhost:8000/login',
    //     }).then(res => console.log(res));
    // }

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

    // const getUser = () => {
    //     axios({
    //         method: 'GET',
    //         withCredentials: true,
    //         url: 'http://localhost:8000/user',
    //     }).then(res => console.log(res));
    // };

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

    // const logout = () => {
    //     axios({
    //         method: 'POST',
    //         withCredentials: true,
    //         url: 'http://localhost:8000/logout',
    //     })
    //         .then(res => console.log(res))
    //         .catch(error => {
    //             console.error('logout failed! :', error);
    //         });
    // };

    return (
        <div className="App">

            <div>
                <h1>Register</h1>
                <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)}/>
                <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)}/>
                <button onClick={register}>Submit</button>
            </div>


            <div>
                <h1>Login</h1>
                <input placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
                <input placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
                <button onClick={login}>Submit</button>
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
    );
}

export default App;
