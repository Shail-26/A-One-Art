import React from 'react';
import '../assets/styles/Navbar.css';
import '../assets/styles/forall.css';
import logo from '../assets/images/Logo img.png';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-cont">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li><a href='/home'>Home</a></li>
          <li><a href="/about">Ourwork</a></li>
          <li><a href="/services">Products</a></li>
          <li><a href="/order">Order</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
        <div className='btn-main-class'>
          <div className='button-class'>
            <button className='sign-in-btn nav-btn'><a href="/Login">Sign In</a></button>
            <button className='sign-up-btn nav-btn'><a href="/Register">Sign Up</a></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
