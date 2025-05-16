import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import { AuthProvider, AuthContext } from './AuthContext';

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
