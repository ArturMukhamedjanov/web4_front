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
                        <td>{round(attempt.x)}</td>
                        <td>{round(attempt.y)}</td>
                        <td>{round(attempt.r)}</td>
                        <td>{attempt.res ? "True" : "False"}</td>
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