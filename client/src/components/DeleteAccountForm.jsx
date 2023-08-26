import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DeleteAccountForm({onCancel}) {
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this account?');

            if (confirmed) {
                const response = await axios.delete('http://localhost:8000/auth/delete-account', {
                    withCredentials: true
                });

                console.log(response);
                toast.success('Account deleted! :(');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="form delete-form">
            <p>If you are sure that you want to permanently delete your account, please confirm by clicking the
                button
                below.</p>
            <button className="button button-delete" type="button" onClick={onSubmit}>Delete Account</button>
            <button className="button button-cancel" type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
}

export default DeleteAccountForm;