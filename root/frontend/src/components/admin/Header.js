import React from 'react';
import '../../assets/styles/forall.css';
import logo from '../../assets/images/Logo img.png';

const Navbar = () => {
    return (
        <div className="navbar admin">
            <div className="nav-cont">
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
            </div>
        </div>
    );
};

export default Navbar;
