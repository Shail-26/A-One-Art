import React, { useState, useEffect } from 'react';
import '../../assets/styles/ReviewModal.css';

function ReviewModal({ product, closeModal }) {
    const host = "http://localhost:5000";
    const [reviews, setReviews] = useState(product.reviews || []);
    const [users, setUsers] = useState({}); // Object to store user details by ID

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${host}/product/${product._id}`, {
                    method: 'GET',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }

                const data = await response.json();
                setReviews(data.reviews); // The populated reviews

                // Fetch user details for each review
                const userPromises = data.reviews.map(review => 
                    fetch(`${host}/api/admin/getuser/${review.user}`, {
                        method: 'GET',
                        headers: {
                            'auth-token': localStorage.getItem('auth-token')
                        }
                    }).then(res => res.json())
                );

                const usersData = await Promise.all(userPromises);

                // Store user details in an object keyed by user ID
                const usersObj = usersData.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {});

                setUsers(usersObj);

            } catch (error) {
                console.error('Error fetching product reviews:', error);
            }
        };

        fetchProduct();
    }, [product._id]);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Close button */}
                <button className="close-modal" onClick={closeModal}>X</button>
                
                <h2>Reviews for {product.name}</h2>

                {/* Show all existing reviews */}
                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <p>Name: {users[review.user] ? users[review.user].name : 'Loading...'}</p> {/* Display user name */}
                                <p>Email: {users[review.user] ? users[review.user].email : 'Loading...'}</p> {/* Display user name */}
                                <br />
                                <p>Comment: {review.comment}</p>
                                <span>Rating: {review.rating} ★</span>
                            </div>
                        ))
                    ) : (
                        <p>No Reviews</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReviewModal;
