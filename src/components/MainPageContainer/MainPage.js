import React, {useState} from 'react';
import Plot from './plot/Plot';
import AttemptForm from './AttemptForm';
import AttemptsTable from './AttemptsTable';
import {Link, useNavigate} from 'react-router-dom';

const MainPage = ({serverPort}) => {
    const [attempts, setAttempts] = useState([])
    console.log(attempts)
    const updateAttempts = (newAttempts) => {
        setAttempts(newAttempts)
    }

    const getAttempts = () =>{
        return attempts
    }

    const navigate = useNavigate();

    const sendLogoutRequest = () => {
        localStorage.clear()
        navigate("/")
    }

    return(
        <div className='main-page-block'>
            <p>
                <Link className='logout_link' to="/" onClick={sendLogoutRequest}>Log out</Link>
            </p>
            <div className='form-table-box'>
                <AttemptForm updateAttempts={updateAttempts}  serverPort={serverPort}/>
                <AttemptsTable attempts={attempts}/>
            </div>
            <Plot updateAttempts={updateAttempts} serverPort={serverPort}/>
        </div>
    );
};

export default MainPage;

