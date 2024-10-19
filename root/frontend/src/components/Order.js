import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../assets/styles/Order.css';
import '../assets/styles/forall.css';
import successIcon from '../assets/images/check-icon.png';
import Background4 from '../assets/images/backround-2.jpg';

const EventForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        event: '',
        description: '',
        dateFrom: '',
        dateTo: '',
        location: '',
    });
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('estimate');
    const [confirmOrder, setConfirmOrder] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            // Redirect to login page if not authenticated
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateDates = () => {
        const { dateFrom, dateTo } = formData;
        const today = new Date().setHours(0, 0, 0, 0);
        const startDate = new Date(dateFrom).setHours(0, 0, 0, 0);
        const endDate = new Date(dateTo).setHours(0, 0, 0, 0);

        if (startDate < today) {
            return 'Start date cannot be in the past';
        }
        if (endDate < today) {
            return 'End date cannot be in the past';
        }
        if (endDate < startDate) {
            return 'End date must be after start date';
        }
        return null;
    };

    const calculatePrice = () => {
        const { dateFrom, dateTo } = formData;
        const startDate = new Date(dateFrom);
        const endDate = new Date(dateTo);

        // Calculate the difference in days
        const eventDuration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

        // Pricing logic based on duration
        let price = 0;
        if (eventDuration === 1) {
            price = 10000; // 1-day event
        } else if (eventDuration === 2) {
            price = 20000; // 2-day event
        } else {
            price = 50000; // 3+ day event
        }

        return price;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dateError = validateDates();
        if (dateError) {
            setError(dateError);
            return;
        }

        const calculatedPrice = calculatePrice();
        setEstimatedPrice(calculatedPrice);
        setModalContent('estimate');
        setShowModal(true);
    };

    const handleConfirm = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            if (!token) {
                // Handle the case where token is missing or expired
                setError('Authentication required');
                return;
            }

            const response = await fetch('http://localhost:5000/order-det', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token // Use the token from localStorage
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful submission
                console.log('Order submitted successfully:', data);
                setConfirmOrder(true);
                setModalContent('success');
            } else {
                // Handle validation errors
                setError(data.errors || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            setError('Internal Server Error');
        }
    }

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <div
        style={{ 
            backgroundImage: `url(${Background4})`, // Apply background image inline
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
          }}
        >
            <Navbar />
            <div className="event-form-container">
                <form className="event-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="event">Event</label>
                        <select id="event" name="event" required value={formData.event} onChange={handleChange}>
                            <option value="">Select an Event</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input type="text" id="desc" name="desc" value={formData.desc} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <div className="date-range">
                            <input type="date" id="date-from" name="dateFrom" required value={formData.dateFrom} onChange={handleChange} />
                            <span>To</span>
                            <input type="date" id="date-to" required name="dateTo" value={formData.dateTo} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" required name="location" value={formData.location} onChange={handleChange} />
                    </div>
                    {estimatedPrice && (
                        <div className="form-group">
                            <label htmlFor="estimated-price">Estimated Price</label>
                            <input type="text" id="estimated-price" name="estimatedPrice" value={`Rs. ${estimatedPrice}`} readOnly />
                        </div>
                    )}
                    {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <button className="order-btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            {showModal && (
                <div className="order-modal">
                    <div className="order-modal-content">
                        <span className="close" onClick={handleCancel}>&times;</span>
                        {modalContent === 'estimate' ? (
                            <>
                                <h2>Estimated Price: Rs. {estimatedPrice}</h2>
                                <p>This price is estimated and can be changed as per requirements discussed in the meeting. We will contact you soon.</p>
                                <div className="modal-buttons">
                                    <button className="btn-confirm" onClick={handleConfirm}>Confirm</button>
                                    <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>Your order has been placed successfully!</p>
                                <img src={successIcon} alt="Success Icon" className="success-icon" />
                                <div className="modal-buttons">
                                    <button className="btn-cancel" onClick={handleCancel}>Close</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventForm;
