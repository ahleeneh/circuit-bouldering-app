import React from 'react';
import SessionDonutChart from './SessionDonutChart';
import SessionBarChart from './SessionBarChart';

function SessionCardContainer({sessions, selectedView}) {
    return (
        <div className="session-card-container">

            {sessions.map(session => (
                selectedView === 'donut' ? (
                    <SessionDonutChart key={session._id} session={session}/>
                ) : (
                    <SessionBarChart key={session._id} session={session}/>
                )
            ))}
        </div>
    );
}

export default SessionCardContainer;