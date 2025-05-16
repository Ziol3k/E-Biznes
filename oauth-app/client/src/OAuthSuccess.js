import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function OAuthSuccess() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log('Odebrany token w OAuthSuccess:', token);
        if (token) {
            login(token);
            navigate('/profile');
        } else {
            navigate('/');
        }
    }, [login, navigate]);


    return <p>Logowanie przez Google...</p>;
}

export default OAuthSuccess;
