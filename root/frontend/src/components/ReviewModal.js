// ReviewModal.jsx
import React, { useState } from 'react';
import '../assets/styles/ReviewModal.css';

function ReviewModal({ product, closeModal }) {
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState(product.reviews || []); // Assuming each product has a reviews field

    const handleSubmitReview = () => {
        if (reviewText) {
            const newReview = { text: reviewText, date: new Date() };
            setReviews([...reviews, newReview]);
            setReviewText('');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Close button */}
                <button className="close-modal" onClick={closeModal}>X</button>
                
                <h2>Reviews for {product.name}</h2>

                <div className="reviews-list">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="review">
                                <p>{review.text}</p>
                                <small>{new Date(review.date).toLocaleDateString()}</small>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>

                <div className="write-review">
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                    ></textarea>
                    <button onClick={handleSubmitReview}>Submit Review</button>
                </div>
            </div>
        </div>
    );
}

export default ReviewModal;
