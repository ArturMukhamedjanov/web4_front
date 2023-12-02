import React from 'react';
import Title from '../Title';
import { useForm } from "react-hook-form";
import {drawPlotWithPoints} from "./plot/plotScripts";

const AttemptForm = ({updateAttempts, serverPort}) => {
    const token =  localStorage.getItem("token");

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(token);

        console.log("Attempt entered by user:");
        console.log(data);

        tryToSendAddAttemptRequest(serverPort, token, data).then(
            (newAttempt) => {
                console.log("Got this attempt from server:");
                console.log(newAttempt);
                getPointsFromServer(serverPort, token).then((data) => {
                    // Update the state with the received data
                    localStorage.setItem("points", JSON.stringify(data));
                    drawPlotWithPoints(data);
                    updateAttempts(data)
                });

                //todo: draw plot and add it to table. (Maybe they both could just subscribe to the state data)
            }
        ).catch(() => {
                //todo: maybe token is expired - need to go to login page
                console.log("Adding attempt finished with error!");
                alert("Adding attempt finished with error! logout please...");

            }
        );
    };

    const clearAttempts = async (port, token) =>{
        let url = "http://localhost:"+ port +"/api/clear";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });

        if(response.status !== 200){
            alert("Something went wrong");

        }else {
            getPointsFromServer(serverPort, token).then((data) => {
                // Update the state with the received data
                localStorage.setItem("points", JSON.stringify(data));
                drawPlotWithPoints(data);
                updateAttempts(data)
            });
        }

    }
    // console.log(watch("example")); you can watch individual input by pass the name of the input

    return (
        <form className="attempt_form container" onSubmit={handleSubmit(onSubmit)}>
            <Title text='Enter Coordinates'/>
            {/* <label>X</label> */}
            <p >X:</p>
            <input placeholder='X: from -5 to 3'
                   {...register("x", {required: true, pattern: /^-?[0-9]+$/i, min: -5, max: 3 })} />
            {errors.x && (
                <p className='error'>X has to be in -5 ... 3</p>
            )}

            <p >Y:</p>
            <input placeholder='Y: from -5 to 3'
                   defaultValue={-3}
                   {...register("y", {required: true, pattern: /^-?[0-9]+$/i, min: -5, max: 3 })} />

            {errors.y && (
                <p className='error'> Y has to be in -5 ... 3</p>
            )}

            <p >R:</p>
            <input id = "Rval" placeholder='R: from 0 to 5'
                   defaultValue={3}
                   {...register("r", {required: true, pattern: /^-?[0-9]+$/i, min: 0, max: 5 })} />

            {errors.r && (
                <p className='error'>R has to be in -5 ... 3</p>
            )}



            <input type="submit" value="Submit" className='btn-block btn' />
            <button className="btn btn-block" onClick={() => clearAttempts(serverPort, token)}>
                Clear
            </button>
        </form>
    );

}

export default AttemptForm;



let tryToSendAddAttemptRequest = async (port, token, data) => {
    console.log(port);
    let url = "http://localhost:"+ port +"/api/addPoint";
    data.token = token;
    console.log("Sending POST request to url: " + url + ". With body: " + JSON.stringify(data));
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token
        },
        mode: 'cors',
        body: JSON.stringify(data),
    });
    return await response.json();
}

let getPointsFromServer = async (port, token) => {
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
        body: JSON.stringify({ token: token }),
    });
    var json_answ = await response.json();
    console.log(json_answ)
    var res = []
    for(var k in json_answ) {
        var v = json_answ[k];
        res.push(v);
    }
    return res;
};