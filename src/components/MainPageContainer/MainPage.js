import React, {useState} from 'react';
import Plot from './plot/Plot';
import AttemptForm from './AttemptForm';
import AttemptsTable from './AttemptsTable';
import {Link, useNavigate} from 'react-router-dom';

const MainPage = ({serverPort, redirectToLogin}) => {
    const [attempts, setAttempts] = useState([])
    console.log(attempts)
    const updateAttempts = (newAttempts) => {
        setAttempts(newAttempts)
    }

    const getAttempts = () =>{
        return attempts
    }


    const sendLogoutRequest = () => {
        localStorage.clear()
        redirectToLogin()
    }

    return(
        <div className='main-page-block'>
            <button className="btn btn-block" onClick={sendLogoutRequest}>
                Log out
            </button>
            <div className='form-table-box'>
                <AttemptForm updateAttempts={updateAttempts}  serverPort={serverPort}/>
                <AttemptsTable attempts={attempts}/>
            </div>
            <Plot updateAttempts={updateAttempts} serverPort={serverPort}/>
        </div>
    );
};

export default MainPage;

