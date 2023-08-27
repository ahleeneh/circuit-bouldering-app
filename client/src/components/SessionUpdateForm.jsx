import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

function SessionUpdateForm({sessionId, initialData, onUpdateSuccess, setSelectedSessionId}) {
    const [expandedBeginner, setExpandedBeginner] = useState(true);
    const [expandedIntermediate, setExpandedIntermediate] = useState(true);
    const [expandedAdvanced, setExpandedAdvanced] = useState(true);
    const {register, handleSubmit} = useForm({
        defaultValues: {
            ...initialData,
            date: new Date(initialData.date).toISOString().split('T')[0]
        }
    });

    const onUpdate = async (data) => {
        data.yellow = data.yellow || 0;
        data.red = data.red || 0;
        data.green = data.green || 0;
        data.purple = data.purple || 0;
        data.orange = data.orange || 0;
        data.black = data.black || 0;
        data.blue = data.blue || 0;
        data.pink = data.pink || 0;
        data.white = data.white || 0;

        try {
            await axios.put(`http://localhost:8000/session/${sessionId}`, data, {
                withCredentials: true
            })
            onUpdateSuccess(data);
            toast.success('Session updated!', {icon: '🔄'});
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <form className="session-update-form" onSubmit={handleSubmit(onUpdate)}>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    {...register('date')}
                />

                <div className="difficulty-container">
                    <div className="toggle-difficulty" onClick={() => setExpandedBeginner(!expandedBeginner)}>
                        {expandedBeginner ? <ExpandLessRoundedIcon/> : <ExpandMoreRoundedIcon/>}
                        <span>Beginner</span>
                    </div>

                    {expandedBeginner && (
                        <div className="difficulty-options">

                            <div className="input-group">
                                <label htmlFor="yellow">Yellow (VB-V0)</label>
                                <input
                                    type="number"
                                    name="yellow"
                                    {...register('yellow')}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="red">Red (V0-V2)</label>
                                <input
                                    type="number"
                                    name="red"
                                    {...register('red')}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="green">Green (V1-V3)</label>
                                <input
                                    type="number"
                                    name="green"
                                    {...register('green')}
                                />
                            </div>

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

                            <div className="input-group">
                                <label htmlFor="purple">Purple (V2-V4)</label>
                                <input
                                    type="number"
                                    name="purple"
                                    {...register('purple')}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="orange">Orange (V3-V5)</label>
                                <input
                                    type="number"
                                    name="orange"
                                    {...register('orange')}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="black">Black (V4-V6)</label>
                                <input
                                    type="number"
                                    name="black"
                                    {...register('black')}
                                />
                            </div>

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

                            <div className="input-group">
                                <label htmlFor="blue">Blue (V5-V7)</label>
                                <input
                                    type="number"
                                    name="blue"
                                    {...register('blue')}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="pink">Pink (V6-V8)</label>
                                <input
                                    type="number"
                                    name="pink"
                                    {...register('pink')}
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="white">White (V8+)</label>
                                <input
                                    type="number"
                                    name="white"
                                    {...register('white')}
                                />
                            </div>

                        </div>
                    )}
                </div>

                <button className="button button-update" type="submit">Update</button>
                <button className="button button-cancel" onClick={() => setSelectedSessionId(null)}>Cancel</button>

            </form>
        </>

    );
}

export default SessionUpdateForm;