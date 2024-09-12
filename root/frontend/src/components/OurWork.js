import React from 'react';
import Navbar from './Navbar';
import '../assets/styles/OurWork.css'; // Adjust the file path if necessary
import babyshower from '../assets/images/babyshower.jpg';
import bday from '../assets/images/bday.jpg';
import festival from '../assets/images/festival.jpg';
import wedding from '../assets/images/wedding.jpg';
import others from '../assets/images/others.jpg';

const OurWork = () => {
  return (
    <div className="ourwork">
      <Navbar />
      <div className="work-container">
        <div className="work-item">
          <img src={festival} alt="Ring Ceremony" />
          <p className="work-text">Ring Ceremony</p>
        </div>
        <div className="work-item">
          <img src={babyshower} alt="Baby Shower" />
          <p className="work-text">Baby Shower</p>
        </div>
        <div className="work-item">
          <img src={bday} alt="Birthday Celebration" />
          <p className="work-text">Birthday Celebration</p>
        </div>
        <div className="work-item">
          <img src={wedding} alt="Wedding Ceremony" />
          <p className="work-text">Wedding Ceremony</p>
        </div>
        <div className="work-item">
          <img src={others} alt="Wedding Ceremony" />
          <p className="work-text">Wedding Ceremony</p>
        </div>
      </div>
    </div>
  );
};

export default OurWork;
