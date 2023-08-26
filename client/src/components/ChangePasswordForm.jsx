import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChangePasswordForm({onCancel}) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.put('http://localhost:8000/auth/change-password', data, {
                withCredentials: true
            });
            toast.success('Password changed!', {icon: '🔄'});
        } catch (error) {
            console.error(error);
            toast.error('Incorrect password.', {icon: '🚫'});
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="oldPassword">Old Password:
                <input
                    type="password"
                    name="oldPassword"
                    {...register('oldPassword', {
                        required: 'required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters.',
                        },
                    })}
                    autoComplete="current-password"
                />
                <p>{errors.oldPassword?.message}</p>
            </label>

            <label htmlFor="newPassword">New Password:
                <input
                    type="password"
                    name="newPassword"
                    {...register('newPassword', {
                        required: 'required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters.',
                        },
                    })}
                />
                <p>{errors.newPassword?.message}</p>
            </label>

            <button className="button button-register" type="submit">Update Password</button>
            <button className="button button-cancel" type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
}

export default ChangePasswordForm;