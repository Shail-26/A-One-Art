import React, { useState, useEffect } from 'react';
import '../../assets/styles/product-manage.css';
import '../../assets/styles/modal.css';

const Product_Manage = () => {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // Close modal when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.id === 'myModal') {
                closeModal();
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);



    const prod = [
        { name: 'Lorem', price: 'xxx'},
        { name: 'Lorem', price: 'xxx'},
        { name: 'Lorem', price: 'xxx'},
        { name: 'Lorem', price: 'xxx'},
        { name: 'Lorem', price: 'xxx'},
        { name: 'Lorem', price: 'xxx'},
        { name: 'Lorem', price: 'xxx'},
    ];
    return (
        <div className="product-manage-main-content">
            <div className="add-btn-cont">
                <button id="openModalBtn" className="add-product-btn" onClick={openModal}>Add Product</button>
            </div>
            {isOpen && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Form Title</h2>
                        <form id="modalForm">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" className="input-field" name="name" required /><br /><br />

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" className="input-field" name="email" required /><br /><br />

                            <label htmlFor="message">Message:</label>
                            <textarea id="message" className="textarea-field" name="message" required></textarea><br /><br />

                            <button type="submit" className="btn-submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}
            <div className="product-cards">
                {prod.map((prod, index) => (
                    <div key={index} className="product-card">
                        <div className="product-image"></div>
                        <div className="product-details">
                            <p className="product-name">{prod.name}</p>
                            <p className="product-price">Rs. {prod.price}</p>
                            <div className="product-actions">
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
                
                
                {/* */}
            </div>
        </div>

    )
}

export default Product_Manage