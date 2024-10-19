import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/ContactUs.css';
import '../assets/styles/forall.css';
import Background5 from '../assets/images/background-4.jpg';

const ContactUs = () => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback Submitted:', feedback);
        alert('Thank you for your feedback!');
    };

    return (
        <div className='cff'
            style={{
                backgroundImage: `url(${Background5})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh'
            }}
        >
            <Navbar />
            <div className="contact-feedback-container">
                <div className="contact-section">
                    <h2>Contact</h2>
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

                <div className="feedback-section">
                    <h2>Feedback</h2>
                    <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                        <div className="feedback-form-group">
                            <label htmlFor="feedback">Your Feedback</label>
                            <textarea
                                id="feedback"
                                name="feedback"
                                rows="5"
                                value={feedback}
                                onChange={handleFeedbackChange}
                                required
                            ></textarea>
                        </div>
                        <button className='feedback-submit-btn' type="submit">Submit Feedback</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
