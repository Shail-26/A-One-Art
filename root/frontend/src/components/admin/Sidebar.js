import React from 'react';
// import { FaUser, FaShoppingCart, FaBox, FaCamera } from 'react-icons/fa';
import '../../assets/styles/Sidebar.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="menu">Menu</div>
            <div className="btn-outer-container">
                <div className="btn-container">
                    <div className="btns">
                        <a href="/admin/"><span className="dot grn"></span>Dashboard</a>
                        <a href="/admin/"><span className="dot pnk"></span>Customer Details</a>
                        <a href="/admin/"><span className="dot ylw"></span>Order Management</a>
                        <a href="/admin/"><span className="dot blu"></span>Product Management</a>
                        <a href="/admin/"><span className="dot lgrn"></span>Studio Services</a>
                    </div>
                </div>
                <div className="btns-2">
                    <a href="/admin/"><span className="dot red"></span>Logout</a>
                </div>
            </div>
            
            
        </div>
    );
};

export default Sidebar;
