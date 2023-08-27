import React from 'react';
import circuit from '../assets/circuit.png';

function AboutPage() {

    return (
        <div className="App-main">
            <div className="content">
                <div className="page">

                    <h2>About</h2>
                    <p>The Circuit Bouldering Progress App is your go-to companion for tracking your climbing journey!</p>
                    <p>The boulders at Bouldering Project are set with color-coded holds called circuits, where the color of the circuit represents difficulty.</p>
                    <img src={circuit} alt="Circuit" style={{maxWidth: '700px', display: 'flex', margin: '0 auto'}}/>

                </div>
            </div>
        </div>
    );

}

export default AboutPage;