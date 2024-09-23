import React from 'react';
import '../../assets/styles/forall.css';
import logo from '../../assets/images/Logo img.png';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Header.css';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('admin');
        navigate('/home')
    };
    return (
        <div className="navbar admin">
            <div className="nav-cont">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                    <p>Hello Owner </p>
                <div className='btn-main-class'>
                    <div className='button-class'>
                        <button className='sign-in-btn nav-btn'><a onClick={handleLogout}>Logout</a></button>
                        <button className='sign-up-btn nav-btn'><a href="/home">User</a></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
