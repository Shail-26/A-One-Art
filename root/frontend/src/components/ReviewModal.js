import React, { useState, useEffect } from 'react';
import StarRating from './StarRating'; // Import the star rating component
import '../assets/styles/ReviewModal.css';

function ReviewModal({ product, closeModal }) {
    const host = "http://localhost:5000"
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0); // State to store the star rating
    const [reviews, setReviews] = useState(product.reviews || []); // Assuming product has a reviews field
    const [error, setError] = useState(null);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

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
    

    const handleSubmitReview = async () => {
        if (!reviewText || rating === 0) {
            setError('Please provide both a rating and a review.');
            return;
        }

        const newReview = {
            comment: reviewText,
            rating: rating, // Store the star rating
            date: new Date()
        };

        // API call to submit the review
        try {
            const response = await fetch(`${host}/review/${product._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token') // If authentication is required
                },
                body: JSON.stringify(newReview)
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            const savedReview = await response.json();

            // // Add the new review to the list of reviews
            setReviews([...reviews, savedReview]);
            setReviewText(''); // Clear review text
            setRating(0); // Reset star rating
        } catch (error) {
            setError('There was an error submitting your review. Please try again later.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Close button */}
                <button className="close-modal" onClick={closeModal}>X</button>
                
                <h2>Reviews for {product.name}</h2>

                {/* Show all existing reviews */}
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item">
                            <p>Comment: {review.comment}</p>
                            <span>Rating: {review.rating} ★</span>
                        </div>
                    ))} 
                </div>

                <div className="write-review">
                    {/* Star Rating Component */}
                    <h4>Your Rating:</h4>
                    <StarRating onRatingChange={handleRatingChange} />

                    {/* Validation error */}
                    {error && <p className="error">{error}</p>}

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
