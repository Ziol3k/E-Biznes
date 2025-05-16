import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function OAuthSuccess() {
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedToken = urlParams.get('token');

        if (encodedToken) {
            const token = decodeURIComponent(encodedToken);
            login(token);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [login]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return <p>Przetwarzanie logowania...</p>;
}

export default OAuthSuccess;