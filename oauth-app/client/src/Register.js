import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Form.css';

function Register() {
    const { isAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { email, password });
            setMsg('Rejestracja zakończona sukcesem!');
        } catch (err) {
            setMsg('Użytkownik o tym adresie już istnieje.');
        }
    };

    return (
        <div className="form-container">
            <h2>Rejestracja</h2>
            <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Zarejestruj</button>
            <p className="message">{msg}</p>
        </div>
    );
}

export default Register;