import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Check for token in local storage on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        setIsAuthenticated(true);
        }
    }, []);

    // Function to handle login
    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setUser(userData);
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuthContext, AuthContext };