import React, { useState } from 'react';
import '../assets/styles/forall.css';
import '../assets/styles/CustomizeModal.css';
import successIcon from '../assets/images/check-icon.png'; // Adjust the path as necessary

function CustomizeModal({ product, closeModal }) {
    const host = "http://localhost:5000";
    const [customName, setCustomName] = useState('');
    const [customDescription, setCustomDescription] = useState('');
    const [customImage, setCustomImage] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false); // New state for order success

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCustomImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productId', product._id);
        formData.append('customName', customName);
        formData.append('customDesc', customDescription);
        formData.append('image', customImage);

        try {
            const response = await fetch(`${host}/customizeorder`, {
                method: 'POST',
                body: formData,
                headers: {
                    'auth-token': localStorage.getItem('auth-token'),
                }
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Custom order created successfully');
                setOrderSuccess(true); // Set order success state to true
                setCustomName(''); // Clear fields
                setCustomDescription('');
                setCustomImage(null);
            } else {
                console.error('Error:', data.errors || data.message);
            }
        } catch (error) {
            console.error('Error submitting custom order:', error);
        }
    };

    const handleCancel = () => {
        setOrderSuccess(false); // Reset order success state when closing
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {orderSuccess ? ( // Conditional rendering for success message
                    <div className="success-message">
                        <p>Your order has been placed successfully!</p>
                        <img src={successIcon} alt="Success Icon" className="success-icon" />
                        <div className="modal-buttons">
                            <button className="btn-cancel" onClick={handleCancel}>Close</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>Customize {product.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group-modal">
                                <label htmlFor="customName">Name:</label>
                                <input
                                    type="text"
                                    id="customName"
                                    value={customName}
                                    onChange={(e) => setCustomName(e.target.value)}
                                    placeholder="Enter custom name"
                                />
                            </div>
                            <div className="form-group-modal">
                                <label htmlFor="customDescription">Description:</label>
                                <textarea
                                    id="customDescription"
                                    maxLength={250}
                                    value={customDescription}
                                    onChange={(e) => setCustomDescription(e.target.value)}
                                    placeholder="Enter custom description"
                                    required
                                />
                            </div>
                            <div className="form-group-modal">
                                <label htmlFor="customImage">Image:</label>
                                <input
                                    type="file"
                                    id="customImage"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            {customImage && (
                                <div className="preview">
                                    <p>Image Preview:</p>
                                    <img src={URL.createObjectURL(customImage)} alt="Custom" className="preview-image" />
                                </div>
                            )}
                            <div className="modal-actions">
                                <button type="submit" className="submit-btn">Submit</button>
                                <button type="button" className="close-btn" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default CustomizeModal;
