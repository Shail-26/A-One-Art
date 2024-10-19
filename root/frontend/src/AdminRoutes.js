// AdminRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Customer_Manage from './components/admin/CustomerManage';
import Product_Manage from './components/admin/ProductManage';
import OrderManagement from './components/admin/OrderManage';
import Dashboard from './components/admin/DashBoard';
import CustomProduct from './components/admin/CustomProduct';
import Background1 from '../src/assets/images/background-5.jpg';


// Simulated function to check if the user is an admin
const isAdmin = () => {
    // Replace with your actual logic to determine if the user is an admin
    const token = localStorage.getItem('auth-token');
    const isAd = localStorage.getItem('admin');
    // For example purposes, assume a token with 'admin' role
    return token && isAd; // Replace with real token checking
};

const AdminRoutes = () => {
    if (!isAdmin()) {
        return <div className="denied">
            <h1>Access Denied</h1>
            <a href="/home"> &lt;Home</a>
        </div>; // You can replace this with a redirect or popup
    }

    return (
        <Routes>
            <Route path="/home" element={
                <div className='adhm'
                style={{ 
                    backgroundImage: `url(${Background1})`, // Apply background image inline
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh'
                  }}
                >
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <Dashboard></Dashboard>
                    </div>
                </div>
            } />
            <Route path="/customer-details" element={
                <div className='adhm'
                style={{ 
                    backgroundImage: `url(${Background1})`, // Apply background image inline
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh'
                  }}
                >
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <Customer_Manage className="customer_manage"/>
                    </div>
                </div>
            } />
            <Route path="/product-manage" element={
                <div className='adhm'
                style={{ 
                    backgroundImage: `url(${Background1})`, // Apply background image inline
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh'
                  }}
                >
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <Product_Manage className="product_manage"/>
                    </div>
                </div>
            } />
            <Route path="/order-manage" element={
                <div className='adhm'
                style={{ 
                    backgroundImage: `url(${Background1})`, // Apply background image inline
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh'
                  }}
                >
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <OrderManagement className="order-manage"/>
                    </div>
                </div>
            } />
            <Route path="/custom-order-manage" element={
                <div className='adhm'
                style={{ 
                    backgroundImage: `url(${Background1})`, // Apply background image inline
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh'
                  }}
                >
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <CustomProduct className="order-manage"/>
                    </div>
                </div>
            } />
        </Routes>
    );
};

export default AdminRoutes;
