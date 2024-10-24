import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import profileIcon from '../../assets/profile_icon.png';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setShowLogout(false); // Close logout menu
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home or sign-in page after logout
        closeMenu();
    };

    // Handle clicks outside of the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            const profileMenu = document.querySelector('.logout-menu');
            const profileIcon = document.querySelector('.profile-icon');

            if (profileIcon && !profileIcon.contains(event.target) && profileMenu && !profileMenu.contains(event.target)) {
                setShowLogout(false); // Close the logout menu
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Weather Monitor System</h2>
            </div>
            <div className="slide" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                <li className="close-menu" onClick={closeMenu}>&times;</li>
                <li>
                    <NavLink to="/" activeclassname="active-link" onClick={closeMenu}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/alerts" activeclassname="active-link" onClick={closeMenu}>Alerts</NavLink>
                </li>
                {isAuthenticated ? (
                    <li className="user-profile">
                        <div
                            className="profile-icon"
                            onClick={() => setShowLogout(!showLogout)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={profileIcon} alt="Profile" />
                        </div>
                        {showLogout && (
                            <div className="logout-menu">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </li>
                ) : (
                    <li className="navbar-signin">
                        <NavLink to="/signin" activeclassname="active-link" onClick={closeMenu}>Sign In</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;