import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            if (token) {
                const decoded = jwtDecode(token);
                if (decoded?.id) setIsAuthenticated(true);
            }
        } catch {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (token) => {
        console.log('Logowanie, token:', token);
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };


    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
