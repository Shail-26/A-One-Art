import React from 'react';
import '../../assets/styles/forall.css';
import logo from '../../assets/images/Logo img.png';

const Navbar = () => {
    return (
        <nav className="navbar admin">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="nav-links">
                <p>Hello Owner </p>
            </ul>
            <div className='btn-main-class'>
                <div className='button-class'>
                    <button className='sign-in-btn admin-logout nav-btn'>Logout</button>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
