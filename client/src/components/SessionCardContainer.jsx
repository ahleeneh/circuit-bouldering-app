import React from 'react';
import SessionCard from './SessionCard';

function SessionCardContainer({ sessions }) {
    return (
        <div className="session-card-container">
            {sessions.map(session => (
                <SessionCard key={session._id} session={session} />
            ))}
        </div>
    );
}

export default SessionCardContainer;