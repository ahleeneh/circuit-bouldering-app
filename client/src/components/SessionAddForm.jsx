import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SessionAddForm() {
    const [user, setUser] = useState('');
    const {register, handleSubmit, formState: {errors}} = useForm();

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/auth/current-user', {
                withCredentials: true
            });
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);


    const addSession = async (data) => {
        try {
            const sessionData = {
                ...data,
                user: user._id
            }
            const response = await axios.post('http://localhost:8000/session', sessionData, {
                withCredentials: true
            });
            console.log(response);
            toast.success('Yay, the session went through!');
        } catch (error) {
            console.error(error);
            toast.error('Sorry, the session is incorrect. ');
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(addSession)}>
            <label htmlFor="date">Date
                <input
                    type="date"
                    name="date"
                    {...register('date', {required: 'Date is required.'})}
                />
                <p>{errors.date?.message}</p>
            </label>

            <label htmlFor="yellow">Yellow
                <input
                    type="number"
                    name="yellow"
                    {...register('yellow')}
                />
            </label>

            <label htmlFor="red">Red
                <input
                    type="number"
                    name="red"
                    {...register('red')}
                />
            </label>

            <label htmlFor="green">Green
                <input
                    type="number"
                    name="green"
                    {...register('green')}
                />
            </label>

            <label htmlFor="purple">Purple
                <input
                    type="number"
                    name="purple"
                    {...register('purple')}
                />
            </label>

            <label htmlFor="orange">Orange
                <input
                    type="number"
                    name="orange"
                    {...register('orange')}
                />
            </label>

            <label htmlFor="black">Black
                <input
                    type="number"
                    name="black"
                    {...register('black')}
                />
            </label>

            <label htmlFor="blue">Blue
                <input
                    type="number"
                    name="blue"
                    {...register('blue')}
                />
            </label>

            <label htmlFor="pink">Pink
                <input
                    type="number"
                    name="pink"
                    {...register('pink')}
                />
            </label>

            <label htmlFor="white">White
                <input
                    type="number"
                    name="white"
                    {...register('white')}
                />
            </label>

            <button className="button button-login" type="submit">Add Session</button>

        </form>

    )

}

export default SessionAddForm;