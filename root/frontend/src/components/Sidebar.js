import React from 'react';
// import { FaUser, FaShoppingCart, FaBox, FaCamera } from 'react-icons/fa';
import '../assets/styles/Sidebar.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="menu">Menu</div>
            <div className="btn-outer-container">
                <div className="btn-container">
                    <div className="btns">
                        <a><span class="dot grn"></span>Dashboard</a>
                        <a><span class="dot pnk"></span>Customer Details</a>
                        <a><span class="dot ylw"></span>Order Management</a>
                        <a><span class="dot blu"></span>Product Management</a>
                        <a><span class="dot lgrn"></span>Studio Services</a>
                    </div>
                </div>
                <div className="btns-2">
                    <a><span class="dot red"></span>Studio Services</a>
                </div>
            </div>
            
            
        </div>
    );
};

export default Sidebar;
