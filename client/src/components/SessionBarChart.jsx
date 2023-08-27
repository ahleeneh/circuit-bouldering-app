import React from 'react';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

const COLORS = {
    yellow: '#ffbb28',
    red: '#cc3b28',
    green: '#00c45b',
    purple: '#8b21c7',
    orange: '#FF8042',
    black: '#333232',
    blue: '#0088fe',
    pink: '#e3118b',
    white: '#ffffff',
};

function SessionBarChart({sessions}) {
    const generateChartData = (session) => {
        return [
            {
                category: 'VB-V3',
                yellow: session.yellow,
                red: session.red,
                green: session.green,
            },
            {
                category: 'V2-V5',
                purple: session.purple,
                orange: session.orange,
                black: session.black,
            },
            {
                category: 'V5+',
                blue: session.blue,
                pink: session.pink,
                white: session.white,
            },
        ]
    }

    return (
        <div className="session-card-container">
            {sessions.map(session => (
                <div className="session-card" key={session._id}>
                    <p className="session-date">
                        {new Date(session.date).toISOString().split('T')[0]}
                    </p>

                    <BarChart
                        width={229}
                        height={150}
                        data={generateChartData(session)}
                        margin={{
                            top: 20,
                            right: 15,
                            left: -15,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="category"/>
                        <YAxis/>
                        <Tooltip/>
                        {Object.keys(COLORS).map((color) => (
                            <Bar
                                key={`bar-${color}`}
                                dataKey={color}
                                stackId="a"
                                fill={COLORS[color]}
                            >
                                {generateChartData(session).map((entry, index) => (
                                    <Cell key={`cell-${index}`}/>
                                ))}
                            </Bar>
                        ))}
                    </BarChart>

                </div>
            ))}
        </div>
    );

}

export default SessionBarChart;
