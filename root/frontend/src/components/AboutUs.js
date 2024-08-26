import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/AboutUs.css';
import '../assets/styles/forall.css';

const AboutUs = () => {
    return (
        <div className='Main-div'>
            <Navbar />
            <div className="about-us-container">
                <h1>About Us</h1>

                <div className="section achievements">
                    <h2>Achievements</h2>
                    <div className="achievements-grid">
                        <div className="achievement-item">
                            <img src="achievement1.jpg" alt="Achievement 1" />
                            <p>Description of Achievement 1</p>
                        </div>
                        <div className="achievement-item">
                            <img src="achievement2.jpg" alt="Achievement 2" />
                            <p>Description of Achievement 2</p>
                        </div>
                        <div className="achievement-item">
                            <img src="achievement3.jpg" alt="Achievement 3" />
                            <p>Description of Achievement 3</p>
                        </div>
                        <div className="achievement-item">
                            <img src="achievement4.jpg" alt="Achievement 4" />
                            <p>Description of Achievement 4</p>
                        </div>
                    </div>
                </div>

                <div className="section owner-details">
                    <h2>Owner Details</h2>
                    <div className="contact-info">
                        <p><strong>Email:</strong> <a href="mailto:owner@example.com">owner@example.com</a></p>
                        <p><strong>Phone No.:</strong> <a href="tel:+1234567890">+1234567890</a></p>
                    </div>
                </div>

                <div className="section studio-map">
                    <h2>Studio Details</h2>
                    <div className="map-container">
                        <p>Map of the Shop</p>
                        {/* Embed Google Map or place a static map image here */}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AboutUs;