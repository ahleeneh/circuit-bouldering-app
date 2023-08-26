import React, {useState} from 'react';
import axios from 'axios';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionUpdateForm from './SessionUpdateForm';

function SessionTable({sessions, setSessions}) {
    const [selectedSessionId, setSelectedSessionId] = useState(null);

    const onDelete = async (sessionId) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this session?');

            if (confirmed) {
                await axios.delete(`http://localhost:8000/session/${sessionId}`, {
                    withCredentials: true
                })
                setSessions(
                    (prevSessions) =>
                        prevSessions.filter(session => session._id !== sessionId));
                toast.info('Session deleted!', {icon: '🗑'});
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onUpdate = (sessionId) => {
        setSelectedSessionId(sessionId);
    }

    const onUpdateSuccess = (updatedSession) => {
        setSelectedSessionId(null);
        setSessions(
            (prevSessions) =>
                prevSessions.map((session) => session._id === updatedSession._id ? updatedSession : session));
    }

    if (!selectedSessionId) {
        return (
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Yellow</th>
                        <th>Red</th>
                        <th>Green</th>
                        <th>Purple</th>
                        <th>Orange</th>
                        <th>Black</th>
                        <th>Blue</th>
                        <th>Pink</th>
                        <th>White</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>

                    <tbody>
                    {sessions.map(session => (
                        <tr key={session._id}>
                            <td>{new Date(session.date).toISOString().split('T')[0]}</td>
                            <td>{session.yellow}</td>
                            <td>{session.red}</td>
                            <td>{session.green}</td>
                            <td>{session.purple}</td>
                            <td>{session.orange}</td>
                            <td>{session.black}</td>
                            <td>{session.blue}</td>
                            <td>{session.pink}</td>
                            <td>{session.white}</td>
                            <td>
                                <EditRoundedIcon className="update-icon" onClick={() => onUpdate(session._id)}/>
                            </td>
                            <td>
                                <DeleteRoundedIcon className="delete-icon" onClick={() => onDelete(session._id)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <>
            <p className="back-text" onClick={() => setSelectedSessionId(null)}>Back</p>
            <h2>Update Session</h2>
            <SessionUpdateForm
                sessionId={selectedSessionId}
                initialData={sessions.find(session => session._id === selectedSessionId)}
                onUpdateSuccess={onUpdateSuccess}
            />
        </>
    );
}

export default SessionTable;

