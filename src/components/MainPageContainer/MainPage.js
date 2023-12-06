import React, {useState} from 'react';
import Plot from './plot/Plot';
import AttemptForm from './AttemptForm';
import AttemptsTable from './AttemptsTable';
import {Link, useNavigate} from 'react-router-dom';

const MainPage = ({serverPort, redirectToLogin}) => {

    const sendLogoutRequest = () => {
        localStorage.clear()
        redirectToLogin()
    }
    try{
    sendCheckTokenRequest(serverPort, localStorage.getItem("token")).then((result) => {
        if(result.status!==200){
            sendLogoutRequest()
        }
    })
    }catch (e) {
        sendLogoutRequest()
    }

    const [attempts, setAttempts] = useState([])
    console.log(attempts)
    const updateAttempts = (newAttempts) => {
        setAttempts(newAttempts)
    }

    const getAttempts = () =>{
        return attempts
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


let sendCheckTokenRequest = async (port ,token) => {
    let url = 'http://localhost:' + port + '/api/checkToken';
    console.log('Sending POST request to url: ' + url);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: token }),
    });

    return response;
};
