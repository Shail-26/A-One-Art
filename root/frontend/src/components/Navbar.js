import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Navbar.css';
import '../assets/styles/forall.css';
import logo from '../assets/images/Logo img.png';

const Navbar = () => {
    const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        // Redirect to login page if not authenticated
        setLoggedin(true);
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedin(false); // Set loggedin state to false to hide navigation links
  };

  return (
    <div className="navbar">
      <div className="nav-cont">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><NavLink to='/home' className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
          <li><NavLink to="/our-work" className={({ isActive }) => (isActive ? 'active' : '')}>Ourwork</NavLink></li>
          <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink></li>
          <li><NavLink to="/order" className={({ isActive }) => (isActive ? 'active' : '')}>Order</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact Us</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
        </ul>
        <div className='btn-main-class'>
          <div className='button-class'>
            {loggedin ? (
              <>
                <button className='logout-btn nav-btn' onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button className='sign-in-btn nav-btn'><a href="/Login">Sign In</a></button>
                <button className='sign-up-btn nav-btn'><a href="/Register">Sign Up</a></button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
