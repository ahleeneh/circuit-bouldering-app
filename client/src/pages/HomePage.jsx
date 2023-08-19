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

    const handleError = error => {
        console.error('An error occurred: ', error);
    };

    const login = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/login', data, {
                withCredentials: true
            });
            console.log(response);
            toast.success(`Welcome back, ${data.username}!`);
            navigate('/dashboard');
        } catch (error) {
            handleError(error)
            toast.warning('Sorry, the provided username or password is incorrect.');
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

            <form className="form" onSubmit={handleSubmit(login)}>
                <label htmlFor="username">Username:
                    <input
                        type="text"
                        name="username"
                        {...register("username", {required: 'username is required'})}
                        autoComplete="username"
                    />
                    <p>{errors.username?.message}</p>
                </label>

                <label htmlFor="password">Password:
                    <input
                        type="password"
                        name="password"
                        {...register("password", {required: 'password is required'})}
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


            <h2>Get User<br/>
                <button className="button" onClick={getUser}>Submit</button>
            </h2>



            <h2>Log Out<br/>
                <button className="button" onClick={logout}>Submit</button>
            </h2>



        </div>
    )
}

export default HomePage;