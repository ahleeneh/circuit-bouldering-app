import React from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const login = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/login', data, {
                withCredentials: true
            });
            console.log(response);
            toast.success(`Welcome back, ${data.username}!`, {
                icon: '👋'
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('An error occurred: ', error);
            toast.error('Sorry, the provided username or password is incorrect.', {
                icon: '🚫'
            });
        }
    }

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/is-authenticated', {
                withCredentials: true
            });

            if (response.data === true) {
                toast.success('Authenticated!');
            } else {
                toast.error('Not authenticated!');
            }

        } catch (error) {
            console.error('An error occurred: ', error);
        }
    }

    return (

        <div className="App-main">
            <div className="content">
                <div className="page">

                    <h2>Login</h2>

                    <form className="form" onSubmit={handleSubmit(login)}>
                        <label htmlFor="username">Username:
                            <input
                                type="text"
                                name="username"
                                {...register("username", {required: 'Username is required.'})}
                                autoComplete="username"
                            />
                            <p>{errors.username?.message}</p>
                        </label>

                        <label htmlFor="password">Password:
                            <input
                                type="password"
                                name="password"
                                {...register("password", {required: 'Password is required.'})}
                                autoComplete="password"
                            />
                            <p>{errors.password?.message}</p>
                        </label>

                        <button className="button button-login" type="submit">Login</button>
                        <hr/>
                        <Link to="/register">
                            <button className="button button-register-home">Register</button>
                        </Link>
                    </form>

                    <br/>

                    <h2>
                        <button className="button" onClick={getUser}>Check Authentication</button>
                    </h2>

                </div>
            </div>
        </div>
    )
}

export default HomePage;