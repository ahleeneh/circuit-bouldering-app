import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

function SessionAddForm() {
    const navigate = useNavigate();
    const [expandedBeginner, setExpandedBeginner] = useState(true);
    const [expandedIntermediate, setExpandedIntermediate] = useState(true);
    const [expandedAdvanced, setExpandedAdvanced] = useState(true);
    const {register, handleSubmit, formState: {errors}, setValue, watch} = useForm({
        defaultValues: {
            date: new Date().toISOString().split('T')[0],
            yellow: 0,
            red: 0,
            green: 0,
            purple: 0,
            orange: 0,
            black: 0,
            blue: 0,
            pink: 0,
            white: 0
        }
    });

    const incrementCount = (color) => {
        setValue(color, watch(color) + 1);
    }

    const decrementCount = (color) => {
        const currentValue = watch(color);
        if (currentValue > 0) {
            setValue(color, currentValue - 1);
        }
    };

    const addSession = async (data) => {
        try {
            await axios.post('http://localhost:8000/session', data, {
                withCredentials: true
            });
            toast.success('Yay, the session went through!');
            navigate('/sessions');
        } catch (error) {
            console.error(error);
            toast.error('Sorry, the session is incorrect. ');
        }
    }

    return (
        <form className="session-add-form" onSubmit={handleSubmit(addSession)}>
            <label htmlFor="date">Date</label>
            <input
                type="date"
                name="date"
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
                                <RemoveRoundedIcon onClick={() => decrementCount('yellow')} />
                                <span>{watch('yellow')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('yellow')} />
                            </div>
                        </label>

                        <label htmlFor="red">Red (V0-V2)
                            <div className="climb-buttons">
                                <RemoveRoundedIcon onClick={() => decrementCount('red')} />
                                <span>{watch('red')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('red')} />
                            </div>
                        </label>

                        <label htmlFor="green">Green (V1-V3)
                            <div className="climb-buttons">
                                <RemoveRoundedIcon onClick={() => decrementCount('green')} />
                                <span>{watch('green')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('green')} />
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
                                <RemoveRoundedIcon onClick={() => decrementCount('purple')} />
                                <span>{watch('purple')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('purple')} />
                            </div>
                        </label>

                        <label htmlFor="orange">Orange (V3-V5)
                            <div className="climb-buttons">
                                <RemoveRoundedIcon onClick={() => decrementCount('orange')} />
                                <span>{watch('orange')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('orange')} />
                            </div>
                        </label>

                        <label htmlFor="black">Black (V4-V6)
                            <div className="climb-buttons">
                                <RemoveRoundedIcon onClick={() => decrementCount('black')} />
                                <span>{watch('black')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('black')} />
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
                                <RemoveRoundedIcon onClick={() => decrementCount('blue')} />
                                <span>{watch('blue')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('blue')} />
                            </div>
                        </label>

                        <label htmlFor="pink">Pink (V6-V8)
                            <div className="climb-buttons">
                                <RemoveRoundedIcon onClick={() => decrementCount('pink')} />
                                <span>{watch('pink')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('pink')} />
                            </div>
                        </label>

                        <label htmlFor="white">White (V8+)
                            <div className="climb-buttons">
                                <RemoveRoundedIcon onClick={() => decrementCount('white')} />
                                <span>{watch('white')}</span>
                                <AddRoundedIcon onClick={() => incrementCount('white')} />
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