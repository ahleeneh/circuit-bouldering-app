import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleError = error => {
        console.error('An error occurred: ', error);
    };

    const registerUser = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/register', data, {
                withCredentials: true
            });
            console.log(response);
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="page">
            <h2>Circuit Bouldering App</h2>
            <p>lorem ipsum</p>

            <div>
                <h1>Register</h1>

                <form className="form" onSubmit={handleSubmit(registerUser)}>

                    <label htmlFor="email">Email:
                        <input
                            type="text"
                            name="email"
                            {...register('email', {required: 'email is required'})}
                        />
                        <p>{errors.email?.message}</p>
                    </label>

                    <label htmlFor="username">Username:
                        <input
                            type="text"
                            name="username"
                            {...register('username', {required: 'username is required'})}
                            autoComplete="username"
                        />
                        <p>{errors.username?.message}</p>
                    </label>

                    <label htmlFor="password">Password:
                        <input
                            type="password"
                            name="password"
                            {...register('password', {required: 'password is required'})}
                            autoComplete="current-password"
                        />
                        <p>{errors.password?.message}</p>
                    </label>

                    <button className="button button-register" type="submit">Register</button>

                </form>

            </div>

        </div>
    )
}

export default RegisterPage;