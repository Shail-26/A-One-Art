import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Order from './components/Order';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import OurWork from './components/OurWork';
import AdminRoutes from './AdminRoutes';
import Products from './components/Products';

// Mock function to check if user is logged in and an admin
// const isAdmin = () => {
//   // Replace with your actual logic to determine if the user is an admin
//   const token = localStorage.getItem('auth-token');
//   const isAd = localStorage.getItem('admin')==='true';
//   console.log(token + " " + isAd);
//   console.log(token && isAd);
//   // For example purposes, assume a token with 'admin' role
//   // return token && isAd; // Replace with real token checking
//   return (token && isAd);
// };

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/ourwork" element={<OurWork />} />
          <Route path="/product" element={<Products />} />
          
          <Route path="/admin/*" element={<AdminRoutes />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
