import React, {useState} from 'react';

const AttemptsTable = ({attempts}) => {
    if(attempts == null){
        attempts = []
    }
    return(
        <table className='attempts-table container'>
            <thead>
            <tr><th>X</th><th>Y</th><th>R</th><th>Result</th></tr>
            </thead>
            <tbody>
            {attempts.map((attempt, index) => {
                return (
                    // id={i++} key={i++}
                    <tr key={index}>
                        <td>{attempt.x}</td>
                        <td>{attempt.y}</td>
                        <td>{attempt.r}</td>
                        <td>{attempt.res}</td>
                    </tr>
                );
            })}

            </tbody>
        </table>
    );
};

let round = (val) => {
    return Math.round(val * 100) / 100;
}

export default AttemptsTable;