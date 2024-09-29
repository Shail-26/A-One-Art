import React, { useState, useEffect } from 'react';
import '../../assets/styles/ReviewModal.css';

function ReviewModal({ product, closeModal }) {
    const host = "http://localhost:5000"
    const [reviews, setReviews] = useState(product.reviews || []); 


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
