import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import { AuthProvider, AuthContext } from './AuthContext';
import OAuthSuccess from './OAuthSuccess';

function Navigation() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="nav">
      <h1>OAuth App</h1>
      {!isAuthenticated ? (
        <>
          <Link to="/register">Rejestracja</Link> |{' '}
          <Link to="/login">Logowanie</Link>
        </>
      ) : (
        <>
          <Link to="/profile">Profil</Link> |{' '}
          <button onClick={logout}>Wyloguj</button>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/oauth-success"
            element={<OAuthSuccess />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;