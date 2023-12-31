import React from 'react';
import {PieChart, Pie, Cell, Tooltip} from 'recharts';

const COLORS = ['#ffbb28', '#cc3b28', '#00c45b', '#8b21c7', '#FF8042', '#333232', '#0088fe', '#e3118b', '#ffffff'];

function SessionDonutChart({sessions}) {
    const generateChartData = (session) => {
        return [
            {name: 'Yellow', value: session.yellow},
            {name: 'Red', value: session.red},
            {name: 'Green', value: session.green},
            {name: 'Purple', value: session.purple},
            {name: 'Orange', value: session.orange},
            {name: 'Black', value: session.black},
            {name: 'Blue', value: session.blue},
            {name: 'Pink', value: session.pink},
            {name: 'White', value: session.white},
        ]
    };

    return (
        <div className="session-card-container">
            {sessions.map(session => (
                <div className="session-card" key={session._id}>
                    <p className="session-date">
                        {new Date(session.date).toISOString().split('T')[0]}
                    </p>

                    <PieChart width={229} height={150}>
                        <Pie
                            data={generateChartData(session)}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={45}
                            outerRadius={65}
                            fill="#8884d8"
                            paddingAngle={0}
                            startAngle={180}
                            endAngle={-180}
                            stroke="none"
                        >
                            {generateChartData(session).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </div>
            ))}
        </div>
    );

}

export default SessionDonutChart;

