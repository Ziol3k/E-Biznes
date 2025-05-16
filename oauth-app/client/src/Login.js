import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Form.css';

function Login() {
    const { isAuthenticated, login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.token);
            navigate('/profile');
        } catch (err) {
            setMsg('Nieprawidłowy email lub hasło.');
        }
    };

    return (
        <div className="form-container">
            <h2>Logowanie</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Zaloguj</button>
            <div className="login-buttons">
                <a className="google-btn" href="http://localhost:5000/api/auth/google">Zaloguj przez Google</a>
                <a className="github-btn" href="http://localhost:5000/api/auth/github">Zaloguj przez GitHub</a>
            </div>
            <p className="message">{msg}</p>
        </div>
    );
}

export default Login;