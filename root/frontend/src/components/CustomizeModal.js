import React, { useState } from 'react';
import '../assets/styles/forall.css'
import '../assets/styles/CustomizeModal.css'; // Modal-specific styles

function CustomizeModal({ product, closeModal }) {
    const [customName, setCustomName] = useState('');
    const [customDescription, setCustomDescription] = useState('');
    const [customImage, setCustomImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCustomImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you would handle the custom product details (name, description, image).
        console.log('Customized product:', {
            name: customName,
            description: customDescription,
            image: customImage,
        });
        closeModal(); // Close the modal after submission
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Customize {product.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="customName">Name:</label>
                        <input
                            type="text"
                            id="customName"
                            value={customName}
                            onChange={(e) => setCustomName(e.target.value)}
                            placeholder="Enter custom name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="customDescription">Description:</label>
                        <textarea
                            id="customDescription"
                            value={customDescription}
                            onChange={(e) => setCustomDescription(e.target.value)}
                            placeholder="Enter custom description"
                        />
                    </div>
                    <div className="form-group">
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
                            <img src={customImage} alt="Custom" className="preview-image" />
                        </div>
                    )}
                    <div className="modal-actions">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="button" className="close-btn" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CustomizeModal;
