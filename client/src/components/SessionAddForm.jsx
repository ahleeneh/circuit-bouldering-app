import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

function SessionAddForm() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [expandedBeginner, setExpandedBeginner] = useState(true);
    const [expandedIntermediate, setExpandedIntermediate] = useState(true);
    const [expandedAdvanced, setExpandedAdvanced] = useState(true);
    const [user, setUser] = useState('');
    const [sessionData, setSessionData] = useState({
        yellow: 0,
        red: 0,
        green: 0,
        purple: 0,
        orange: 0,
        black: 0,
        blue: 0,
        pink: 0,
        white: 0
    });


    const incrementCount = (color) => {
        setSessionData((prevData) => ({
            ...prevData,
            [color]: prevData[color] + 1
        }));
    };

    const decrementCount = (color) => {
        if (sessionData[color] > 0) {
            setSessionData((prevData) => ({
                ...prevData,
                [color]: prevData[color] - 1
            }));
        }
    };

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
            const sessionDataWithUser = {
                ...sessionData,
                date: data.date,
                user: user._id
            }
            const response = await axios.post('http://localhost:8000/session', sessionDataWithUser, {
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
        <form className="session-form" onSubmit={handleSubmit(addSession)}>
            <label htmlFor="date">Date</label>
            <input
                type="date"
                name="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                {...register('date', {required: 'Date is required.'})}
            />
            <p>{errors.date?.message}</p>

            <div className="difficulty-container">
                <div className="toggle-difficulty" onClick={() => setExpandedBeginner(!expandedBeginner)}>
                    {expandedBeginner ? <ExpandLessRoundedIcon/> : <ExpandMoreRoundedIcon/>}
                    <span>Beginner</span>
                </div>
                {expandedBeginner && (
                    <div className="difficulty-options">
                        <label htmlFor="yellow">Yellow (VB-V0)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('yellow')}>+</button>
                                <span>{sessionData['yellow']}</span>
                                <button type="button" onClick={() => decrementCount('yellow')}>-</button>
                            </div>
                        </label>

                        <label htmlFor="red">Red (V0-V2)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('red')}>+</button>
                                <span>{sessionData['red']}</span>
                                <button type="button" onClick={() => decrementCount('red')}>-</button>
                            </div>
                        </label>

                        <label htmlFor="green">Green (V1-V3)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('green')}>+</button>
                                <span>{sessionData['green']}</span>
                                <button type="button" onClick={() => decrementCount('green')}>-</button>
                            </div>
                        </label>
                    </div>
                )}
            </div>

            <div className="difficulty-container">
                <div className="toggle-difficulty" onClick={() => setExpandedIntermediate(!expandedIntermediate)}>
                    {expandedIntermediate ? <ExpandLessRoundedIcon/> : <ExpandMoreRoundedIcon/>}
                    <span>Intermediate</span>
                </div>
                {expandedIntermediate && (
                    <div className="difficulty-options">
                        <label htmlFor="purple">Purple (V2-V4)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('purple')}>+</button>
                                <span>{sessionData['purple']}</span>
                                <button type="button" onClick={() => decrementCount('purple')}>-</button>
                            </div>
                        </label>

                        <label htmlFor="orange">Orange (V3-V5)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('orange')}>+</button>
                                <span>{sessionData['orange']}</span>
                                <button type="button" onClick={() => decrementCount('orange')}>-</button>
                            </div>
                        </label>

                        <label htmlFor="black">Black (V4-V6)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('black')}>+</button>
                                <span>{sessionData['black']}</span>
                                <button type="button" onClick={() => decrementCount('black')}>-</button>
                            </div>
                        </label>
                    </div>
                )}
            </div>

            <div className="difficulty-container">
                <div className="toggle-difficulty" onClick={() => setExpandedAdvanced(!expandedAdvanced)}>
                    {expandedAdvanced ? <ExpandLessRoundedIcon/> : <ExpandMoreRoundedIcon/>}
                    <span>Advanced</span>
                </div>
                {expandedAdvanced && (
                    <div className="difficulty-options">
                        <label htmlFor="blue">Blue (V5-V7)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('blue')}>+</button>
                                <span>{sessionData['blue']}</span>
                                <button type="button" onClick={() => decrementCount('blue')}>-</button>
                            </div>
                        </label>

                        <label htmlFor="pink">Pink (V6-V8)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('pink')}>+</button>
                                <span>{sessionData['pink']}</span>
                                <button type="button" onClick={() => decrementCount('pink')}>-</button>
                            </div>
                        </label>

                        <label htmlFor="white">White (V8+)
                            <div className="climb-buttons">
                                <button type="button" onClick={() => incrementCount('white')}>+</button>
                                <span>{sessionData['white']}</span>
                                <button type="button" onClick={() => decrementCount('white')}>-</button>
                            </div>
                        </label>
                    </div>
                )}
            </div>

            <button className="button button-login" type="submit">Add Session</button>

        </form>

    )

}

export default SessionAddForm;