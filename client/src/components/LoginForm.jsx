import React from 'react';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";

function LoginForm({ onSubmit }) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
    );

}

export default LoginForm;