import React, { useState, useEffect } from 'react';
import '../assets/styles/Products.css'; // Importing the CSS styles
import Navbar from './Navbar';
import CustomizeModal from './CustomizeModal'; // Importing the modal component
import ReviewModal from './ReviewModal';

function Products() {
    const [isCustomizeModalOpen, setCustomizeModalOpen] = useState(false);
    const [isReviewModalOpen, setReviewModalOpen] = useState(false); // New state for review modal
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showProd, setShowProd] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    useEffect(() => {
        // Filter products based on search term and selected category
        const filtered = showProd.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, showProd]);

    const openCustomizeModal = (product) => {
        setCurrentProduct(product);
        setCustomizeModalOpen(true);
    };

    const openReviewModal = (product) => {
        setCurrentProduct(product);
        setReviewModalOpen(true);
    };

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
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search for products..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <select 
                    className="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Mug">Mug</option>
                    <option value="Photo Frame">Photo Frame</option>
                    <option value="Rakhi">Rakhi</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Magic Mirror">Magic Mirror</option>
                </select>
            </div>
            <div className="products-container">
                {filteredProducts.map((prod, index) => (
                    <div key={index} className="product-card">
                        <div className='product-image'>
                            <img className="product-img" alt={prod.name} src={`${host}/${prod.image}`} onClick={() => openReviewModal(prod)}></img>
                        </div>
                        <div className="product-details">
                            <p className="product-name">{prod.name}</p>
                            <p className="product-description">{prod.desc}</p>
                            <p className="product-price">Rs. {prod.price}</p>
                            <div className="product-actions">
                                <button className="customize-btn" onClick={() => openCustomizeModal(prod)}>Customize and Order</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isCustomizeModalOpen && (
                <CustomizeModal
                    product={currentProduct}
                    closeModal={closeCustomizeModal}
                />
            )}

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
