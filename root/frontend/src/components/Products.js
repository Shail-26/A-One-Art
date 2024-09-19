import React, { useState, useEffect } from 'react';
import '../assets/styles/Products.css'; // Importing the CSS styles
import Navbar from './Navbar';
import CustomizeModal from './CustomizeModal'; // Importing the modal component
import ReviewModal from './ReviewModal';

// Example array of products (you can replace this with real data)

function Products() {
    const [isCustomizeModalOpen, setCustomizeModalOpen] = useState(false);
    const [isReviewModalOpen, setReviewModalOpen] = useState(false); // New state for review modal
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showProd, setShowProd] = useState([]);

    const host = "http://localhost:5000";
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${host}/getallproducts`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setShowProd(data); // Update state with fetched products
        } catch (error) {
            console.error('There was an error fetching the products!', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Function to handle the opening of the modal
    const openCustomizeModal = (product) => {
        setCurrentProduct(product);
        setCustomizeModalOpen(true);
    };

    const openReviewModal = (product) => {
        setCurrentProduct(product);
        setReviewModalOpen(true);
    };

    // Function to handle the closing of the modal
    const closeCustomizeModal = () => {
        setCustomizeModalOpen(false);
        setCurrentProduct(null);
    };

    const closeReviewModal = () => {
        setReviewModalOpen(false);
        setCurrentProduct(null);
    };

    return (
        <div className="Products">
            <Navbar />
            {/* <div className="products-container">
                {showProd.map((product, index) => (
                    <div className="product-card" key={index}>
                        <img src={`${host}/${product.image}`} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.desc}</p>
                            <div className='price-custmz-btn-div'>
                                <p className="product-price">{product.price}</p>
                                <button className="customize-btn" onClick={() => openModal(product)}>
                                    Customize & Order
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
            
            <div className="products-container">
                {showProd.map((prod, index) => (
                    <div key={index} className="product-card">
                        <div className='product-image'>
                            <img className="product-img" alt={prod.name} src={`${host}/${prod.image}`} onClick={() => openReviewModal(prod)}></img>
                        </div>
                        <div className="product-details">
                            <p className="product-name">{prod.name}</p>
                            <p className="product-description">{prod.desc}</p>
                            <p className="product-price">Rs. {prod.price}</p>
                            <div className="product-actions">
                                <button id="openModalBtn" className="customize-btn" onClick={() => openCustomizeModal(prod)} >Customize and Order</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render the CustomizeModal */}
            {isCustomizeModalOpen && (
                <CustomizeModal
                    product={currentProduct}
                    closeModal={closeCustomizeModal}
                />
            )}

            {/* Render the ReviewModal */}
            {isReviewModalOpen && (
                <ReviewModal
                    product={currentProduct}
                    closeModal={closeReviewModal}
                />
            )}
        </div>
    );
}

export default Products;