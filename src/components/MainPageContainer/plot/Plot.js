import React, {useEffect} from 'react';
import {drawPlot, drawPlotAfterClick} from './plotScripts';


const Plot = ({updateAttempts, serverPort}) => {
    let attempts = JSON.parse(localStorage.getItem("points"));
    if(!attempts){
        attempts = []
    }
    const token =  localStorage.getItem("token");


    useEffect(() => {
        if (attempts) {
            drawPlot(attempts);
        }
    });

    useEffect(() => {
        // Fetch data from the server when the component mounts
        getPointsFromServer(serverPort, token).then((data) => {
            // Update the state with the received data
            console.log(data)
            console.log("storaging:" + JSON.stringify(data))
            localStorage.setItem("points", JSON.stringify(data))
            drawPlot(JSON.stringify(data));
            updateAttempts(data)
        });
    }, [serverPort, token]);



    //let upd = (e)=>updatePlot(attempts);
    let addPoint = (e) => {
        let coordinates = drawPlotAfterClick(e);
        if(coordinates !== null){
            console.log(token);

            console.log("Attempt entered by user:");
            console.log(coordinates);

            tryToSendAddAttemptRequest(serverPort, token, coordinates).then(
                (newAttempt) => {
                    console.log("Got this attempt from server:");
                    console.log(newAttempt);
                    getPointsFromServer(serverPort, token).then((data) => {
                        // Update the state with the received data
                        console.log("store data" + JSON.stringify(data))
                        localStorage.setItem("points", JSON.stringify(data))
                        drawPlot( JSON.stringify(data));
                        updateAttempts(data)
                    });
                }
            ).catch(() => {
                    //todo: maybe token is expired - need to go to login page
                    console.log("Adding attempt finished with error!");
                }
            );
        }else{
            console.log("coordinates out of bounds or user's token is expired!");
        }
        drawPlot(localStorage.getItem("points"))
    }

    return <div id='plot' className='plot box'  onClick={addPoint}/>;
};

export default Plot;

let tryToSendAddAttemptRequest = async (port, token, data) => {
    console.log(port);
    let url = "http://localhost:"+ port +"/api/addPoint";
    data.token = token;
    console.log("Sending POST request to url: " + url + ". With body: " + JSON.stringify(data));
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(data),
    });
    return await response.json();
}

let getPointsFromServer = async (port, token) => {
    try {
        let url = 'http://localhost:' + port + '/api/getPoints';
        console.log(
            'Sending POST request to url: ' +
            url +
            '. With token: ' +
            JSON.stringify(token)
        );
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: token}),
        });
        if (response.status !== 200) {
            return [];
        }
        if (response === "") {
            return [];
        }
        var json_answ = await response.json();
        console.log(json_answ)
        var res = []
        for (var k in json_answ) {
            var v = json_answ[k];
            res.push(v);
        }
        return res;
    }catch (e) {
        return []
    }
};