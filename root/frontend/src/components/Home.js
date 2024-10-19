// src/HomePage.js
import React from 'react';
// import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import '../assets/styles/Home.css';
import '../assets/styles/forall.css';
import CmLens from '../assets/images/CamLens.png';
import Background1 from '../assets/images/background-5.jpg';

const HomePage = () => {
  return (
    <div 
    style={{ 
      backgroundImage: `url(${Background1})`, // Apply background image inline
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh'
    }}>
      <Navbar />
      <div className='container-home'>
        <div className="text-container">
          <h1 className="animated-text">Welcome To the Art of Memories</h1>
        </div>
        <div className="lens-container">
          <img src={CmLens} alt="Camera Lens" className="camera-lens" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
