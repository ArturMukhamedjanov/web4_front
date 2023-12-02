// LoginContainer.js
import React from 'react';
import { useForm } from 'react-hook-form';
import Title from '../Title';
import { Link } from 'react-router-dom';

const LoginContainer = ({ serverPort, redirectToRegister, redirectToMain }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    let loginAction = (data) => {
        sendLoginRequest(serverPort, data.login, data.password)
            .then((token) => {
                console.log('Received token for authorization: ' + token);
                if (token.includes('Неверные')) {
                    alert('Fail to request token, maybe login or password are incorrect!');
                } else {
                    localStorage.setItem('token', token);
                    redirectToMain()
                }
            })
            .catch(() => {
                console.log('Fail to request token, maybe login or password are incorrect!');
                alert('Fail to request token, maybe login or password are incorrect!');
                // todo: login or password is incorrect
            });
    };

    return (
        <form className="login_form container" onSubmit={handleSubmit(loginAction)}>
            <Title text="Login Here" />

            <label>Login</label>
            <input
                placeholder="Login: more than 8 chars"
                {...register('login', { required: true, pattern: /^[A-Za-z0-9]+$/i })}
            />
            {errors?.login?.type === 'pattern' && <p className="error">Latin letters and numbers</p>}
            {errors?.login?.type === 'required' && <p className="error">This field is required</p>}

            <label>Password</label>
            <input
                type="password"
                placeholder="Password: more than 8 chars"
                {...register('password', { required: true, pattern: /^[A-Za-z0-9]+$/i, minLength: 8 })}
            />
            {errors?.password?.type === 'pattern' && <p className="error">Latin letters and numbers</p>}
            {errors?.password?.type === 'minLength' && <p className="error">At least 8 chars</p>}
            {errors?.password?.type === 'required' && <p className="error">This field is required</p>}

            <input type="submit" value="Submit" className="btn btn-block" />
            <button className="btn btn-block" onClick={redirectToRegister}>
                Register
            </button>
        </form>
    );
};

export default LoginContainer;

let sendLoginRequest = async (port, login, password) => {
    let url = 'http://localhost:' + port + '/api/login';
    console.log('Sending POST request to url: ' + url);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
    });

    let json = await response.json();
    console.log(json);
    return json.token;
};