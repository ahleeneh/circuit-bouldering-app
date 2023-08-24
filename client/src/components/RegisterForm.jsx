import React from 'react';
import {useForm} from 'react-hook-form';

function RegisterForm({ onSubmit }) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="email">Email:
                <input
                    type="text"
                    name="email"
                    {...register('email', {
                        required: 'required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Invalid email format.',
                        },
                    })}
                />
                <p>{errors.email?.message}</p>
            </label>

            <label htmlFor="username">Username:
                <input
                    type="text"
                    name="username"
                    {...register('username', {required: 'required'})}
                    autoComplete="username"
                />
                <p>{errors.username?.message}</p>
            </label>

            <label htmlFor="password">Password:
                <input
                    type="password"
                    name="password"
                    {...register('password', {
                        required: 'required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters.',
                        },
                    })}
                    autoComplete="current-password"
                />
                <p>{errors.password?.message}</p>
            </label>

            <button className="button button-register" type="submit">Register</button>

        </form>
    );

}

export default RegisterForm;