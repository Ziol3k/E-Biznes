import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [email, setEmail] = useState('');
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!isAuthenticated && !token) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEmail(res.data.email);
            } catch {
                logout();
                navigate('/login');
            }
        };
        fetchProfile();
    }, [isAuthenticated, navigate, logout]);

    return (
        <div className="form-container">
            <h2>Profil</h2>
            <p><strong>Email:</strong> {email}</p>
        </div>
    );
}

export default Profile;