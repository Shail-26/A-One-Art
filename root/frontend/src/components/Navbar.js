import React from 'react';
import '../assets/styles/Navbar.css';
import '../assets/styles/forall.css';
import logo from '../assets/images/Logo img.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><a href='/'>Home</a></li>
        <li><a href="/about">Ourwork</a></li>
        <li><a href="/services">Products</a></li>
        <li><a href="/contact">Order</a></li>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/contact">About Us</a></li>
      </ul>
      <div className='btn-main-class'>
        <div className='button-class'>
          <button className='sign-in-btn nav-btn'>Sign In</button>
          <button className='sign-up-btn nav-btn'>Sign Up</button>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
