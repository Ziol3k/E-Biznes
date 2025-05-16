import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Form.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.token); // Ustaw token i stan zalogowania
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
            <p className="message">{msg}</p>
        </div>
    );
}

export default Login;
