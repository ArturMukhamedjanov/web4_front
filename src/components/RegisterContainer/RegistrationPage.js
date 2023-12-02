import React from 'react';
import RegistrationContainer from './RegistrationContainer';

const RegistrationPage = ({serverPort}) => {
    return <>
        <RegistrationContainer serverPort={serverPort}/>

    </>;
};

export default RegistrationPage;