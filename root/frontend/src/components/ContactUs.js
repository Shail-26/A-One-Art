import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/ContactUs.css';
import '../assets/styles/forall.css';

const ContactUs = () => {
    return (
        <div>
            <Navbar />
            <div className="contact-form-container">
                <form className="contact-form">
                    <div className="contact-form-group">
                        <label htmlFor="email">Email</label>
                        <input className='contact-input' type="email" id="email" name="email" required />
                    </div>
                    <div className="contact-form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button className='contact-submit-btn' type="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;