import React from 'react';
import LoginContainer from './LoginContainer';

const LoginPage = ({serverPort}) => {
    return <>
        <LoginContainer serverPort={serverPort}/>

    </>;
};

export default LoginPage;