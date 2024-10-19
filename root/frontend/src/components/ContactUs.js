import React, { useState } from 'react';
import Navbar from './Navbar';
import '../assets/styles/ContactUs.css';
import '../assets/styles/forall.css';
import Background5 from '../assets/images/background-4.jpg';

const ContactUs = () => {
    const host = "http://localhost:5000";
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false); // For showing a loading state
    const [error, setError] = useState(null);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log('Feedback Submitted:', feedback);
        alert('Thank you for your feedback!');

        try {
            // Using fetch to send POST request to feedback API
            const response = await fetch(`${host}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'), // Add auth token if required
                },
                body: JSON.stringify({
                    feedbackText: feedback, // Send the feedback text
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error submitting feedback');
            }

            const data = await response.json();
            console.log('Feedback Submitted:', data);
            alert('Thank you for your feedback!');
            setFeedback(''); // Clear the feedback form after submission
        } catch (err) {
            console.error('Error submitting feedback:', err.message);
            setError(err.message || 'Error submitting feedback');
        } finally {
            setLoading(false);
        }
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
                        <button className='feedback-submit-btn' type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                        {error && <p className="error-message">Error: {error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
