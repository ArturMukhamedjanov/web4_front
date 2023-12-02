// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginContainer/LoginPage';
import RegistrationPage from './components/RegisterContainer/RegistrationPage';
import Header from './Header';
import MainPage from './components/MainPageContainer/MainPage';

const App = () => {
    const serverPort = 24750;
    const [loading, setLoading] = useState(true);
    const [redirectToMain, setRedirectToMain] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                if (storedToken) {
                    // Assuming you have an API endpoint for token validation on the server
                    const response = await fetch(`http://localhost:${serverPort}/api/checkToken`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ token: storedToken }),
                    });

                    if (response.ok) {
                        // If the server response is successful, set authentication context and redirect to /main
                        setLoading(false);
                        setRedirectToMain(true);
                    } else {
                        setRedirectToMain(false);
                        // If the server response is not successful, stay on the registration page
                        setLoading(false);
                    }
                } else {
                    setRedirectToMain(false);
                    // If no token is found, stay on the registration page
                    setLoading(false);
                }
            } catch (error) {
                setRedirectToMain(false);
                console.error('Error checking token:', error);
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    if (loading) {
        // You can render a loading spinner or any other loading indicator while checking the token
        return <div>Loading...</div>;
    }

    return (
        <div className='App'>
        <Router>
            <Header title="Coordinate checker" />
            <Routes>
                {redirectToMain ? (
                    <Route path="/" element={<Navigate to="/main" replace={true} />} />
                ) : (
                    <>
                        <Route path="/" element={<LoginPage serverPort={serverPort} />} />
                        <Route path="/register" element={<RegistrationPage serverPort={serverPort} />} />
                    </>
                )}
                <Route path="/main" element={<MainPage serverPort={serverPort} attempts={[]} />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;
