import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../assets/styles/ContactUs.css';
import '../assets/styles/forall.css';
import Background5 from '../assets/images/background-4.jpg';

const ContactUs = () => {
    const host = "http://localhost:5000";
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pastFeedbacks, setPastFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    // Function to handle feedback text change
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    // Submit new feedback
    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${host}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({
                    feedbackText: feedback,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error submitting feedback');
            }

            const data = await response.json();
            console.log('Feedback Submitted:', data);
            alert('Thank you for your feedback!');
            setFeedback('');
        } catch (err) {
            console.error('Error submitting feedback:', err.message);
            setError(err.message || 'Error submitting feedback');
        } finally {
            setLoading(false);
        }
    };

    // Fetch past feedbacks when modal is opened
    const fetchPastFeedbacks = async () => {
        try {
            const response = await fetch(`${host}/feedbacks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
            });
            const data = await response.json();
            setPastFeedbacks(data.feedbacks);
        } catch (err) {
            console.error('Error fetching past feedbacks:', err);
        }
    };

    // Handle opening of the modal
    const handleOpenModal = () => {
        setShowModal(true);
        fetchPastFeedbacks();
    };

    // Handle closing of the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedFeedback(null);
    };

    // Update selected feedback
    const handleFeedbackUpdate = async () => {
        if (!selectedFeedback) return;
        try {
            const response = await fetch(`${host}/feedback/${selectedFeedback._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({
                    feedbackText: selectedFeedback.feedbackText,
                }),
            });

            if (!response.ok) {
                throw new Error('Error updating feedback');
            }

            alert('Feedback updated successfully');
            fetchPastFeedbacks(); // Refresh the feedback list
        } catch (err) {
            console.error('Error updating feedback:', err);
            alert('Failed to update feedback');
        }
    };

    // Function to calculate days ago
    const calculateDaysAgo = (updatedAt) => {
        const now = new Date();
        const updatedDate = new Date(updatedAt);
        const timeDiff = Math.abs(now - updatedDate);
        return Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
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
                    <button className='past-feedback-submit-btn' onClick={handleOpenModal}>
                        View Past Feedbacks
                    </button>
                </div>
            </div>

            {/* Modal for viewing and updating past feedbacks */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>Your Past Feedbacks</h2>
                        {pastFeedbacks.length > 0 ? (
                            <ul>
                                {pastFeedbacks.map(feedback => (
                                    <li key={feedback._id} onClick={() => setSelectedFeedback(feedback)}>
                                        {feedback.feedbackText} - 
                                        <span className="days-ago">
                                            ({calculateDaysAgo(feedback.updatedAt)} days ago)
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No feedbacks found.</p>
                        )}

                        {selectedFeedback && (
                            <div className="selected-feedback-update">
                                <h3>Edit Feedback</h3>
                                <textarea
                                    value={selectedFeedback.feedbackText}
                                    onChange={(e) => setSelectedFeedback({ ...selectedFeedback, feedbackText: e.target.value })}
                                ></textarea>
                                <button onClick={handleFeedbackUpdate}>Update Feedback</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;
