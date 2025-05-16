import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

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
