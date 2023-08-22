import React from 'react';
import {PieChart, Pie, Cell, Tooltip} from 'recharts';

const COLORS = ['#f5db1f', '#d31d27', '#3cb42c', '#6842dc', '#ea8012', '#333232', '#1872e3', '#e3118b', '#fff'];

function SessionCard({session}) {
    const data = [
        {name: 'Yellow', value: session.yellow},
        {name: 'Red', value: session.red},
        {name: 'Green', value: session.green},
        {name: 'Purple', value: session.purple},
        {name: 'Orange', value: session.orange},
        {name: 'Black', value: session.black},
        {name: 'Blue', value: session.blue},
        {name: 'Pink', value: session.pink},
        {name: 'White', value: session.white},
    ];


    return (
        <div className="session-card">
            <p className="session-date">
                {new Date(session.date).toISOString().split('T')[0]}
            </p>
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    startAngle={180}
                    endAngle={-180}
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
                <Tooltip/>
            </PieChart>
        </div>
    );

}

export default SessionCard;