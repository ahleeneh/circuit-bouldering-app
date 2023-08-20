import React from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterPage() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/auth/register', data, {
                withCredentials: true
            });
            console.log(response);
            toast.success('Registration successful! You can now log in.', {
                icon: '🤝'
            });
            navigate('/');
        } catch (error) {
            console.error('Registration failed: ', error);
            toast.error('Registration failed. The provided email or username is already in use.', {
                icon: '🚫'
            });
        }
    }

    return (
        <div className="App-main">
            <div className="content">
                <div className="page register-page">

                    <h2>Register</h2>
                    <p>Sign up to record sessions and see sessions from your friends.</p>

                    <form className="form" onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="email">Email:
                            <input
                                type="text"
                                name="email"
                                {...register('email', {required: 'Email is required.'})}
                            />
                            <p>{errors.email?.message}</p>
                        </label>

                        <label htmlFor="username">Username:
                            <input
                                type="text"
                                name="username"
                                {...register('username', {required: 'Username is required.'})}
                                autoComplete="username"
                            />
                            <p>{errors.username?.message}</p>
                        </label>

                        <label htmlFor="password">Password:
                            <input
                                type="password"
                                name="password"
                                {...register('password', {required: 'Password is required.'})}
                                autoComplete="current-password"
                            />
                            <p>{errors.password?.message}</p>
                        </label>

                        <button className="button button-register" type="submit">Register</button>

                    </form>

                </div>
            </div>
        </div>

    );

}

export default RegisterPage;