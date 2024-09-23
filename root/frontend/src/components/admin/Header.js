import React from 'react';
import '../../assets/styles/forall.css';
import logo from '../../assets/images/Logo img.png';
import profilePic from '../../assets/images/festival.jpg'; // Add your profile picture image here
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

                {/* Profile section */}
                <div className="profile-section">
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                    <p>Hello Owner!</p>
                </div>

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
