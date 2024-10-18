import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../../assets/styles/Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    const [loggedin, setLoggedin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (token) {
            // Redirect to login page if not authenticated
            setLoggedin(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('admin');
        setLoggedin(false);
        navigate('/home');
    };
    return (
        <div className="sidebar">
            <div className="menu">Menu</div>
            <div className="btn-outer-container">
                <div className="btn-container">
                    <div className="btns">
                        <a href="/admin/home" className="agrn"><span className="dot grn"></span>Dashboard</a>
                        <a href="/admin/customer-details" className="apnk"><span className="dot pnk"></span>Customer Details</a>
                        <a href="/admin/order-manage" className="aylw"><span className="dot ylw"></span>Order Management</a>
                        <a href="/admin/product-manage" className="ablu"><span className="dot blu"></span>Product Management</a>
                        <a href="/admin/custom-order-manage" className="algrn"><span className="dot lgrn"></span>Custom Order Manage</a>
                        <div className="btns-2">
                            <a href="/admin/" className="ared" onClick={handleLogout}><span className="dot red"></span>Logout</a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Sidebar;
