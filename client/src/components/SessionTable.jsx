import React from 'react';

function SessionTable({sessions}) {
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SessionTable;

