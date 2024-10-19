import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/AboutUs.css';
import '../assets/styles/forall.css';
import achievement1 from '../assets/images/achievement_1.png';

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
                            <img src={achievement1} alt="Achievement 1" />
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
                        <p class="about-mail"><strong>Email:</strong> <a href="mailto:aoneart2008@gmail.com">aoneart2008@gmail.com</a></p>
                        <p class="about-tel"><strong>Phone No.:</strong> <a href="tel:+91 9979534982">+91 9979534982</a></p>
                    </div>
                </div>

                <div className="section studio-map">
                    <h2>Studio Details</h2>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3681.0027666554724!2d72.86056151129715!3d22.69094092853582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDQxJzI3LjQiTiA3MsKwNTEnNDcuMyJF!5e0!3m2!1sen!2sin!4v1729311336446!5m2!1sen!2sin"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AboutUs;