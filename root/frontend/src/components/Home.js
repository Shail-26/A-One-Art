// src/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to the Home Page</h1>
    </div>
  );
};

export default HomePage;
