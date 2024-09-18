import React, { useState } from 'react';
import '../assets/styles/Products.css'; // Importing the CSS styles
import Navbar from './Navbar';
import CustomizeModal from './CustomizeModal'; // Importing the modal component

// Example array of products (you can replace this with real data)
const products = [
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a brief description of Product 1.',
        price: '$20',
        image: '/path/to/image1.jpg', // Replace with actual image path
    },
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a brief description of Product 1.',
        price: '$20',
        image: '/path/to/image1.jpg', // Replace with actual image path
    },
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a brief description of Product 1.',
        price: '$20',
        image: '/path/to/image1.jpg', // Replace with actual image path
    },
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a brief description of Product 1.',
        price: '$20',
        image: '/path/to/image1.jpg', // Replace with actual image path
    },
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a brief description of Product 1.',
        price: '$20',
        image: '/path/to/image1.jpg', // Replace with actual image path
    },
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a brief description of Product 1.',
        price: '$20',
        image: '/path/to/image1.jpg', // Replace with actual image path
    },
    {
        id: 1,
        name: 'Product 1',
        description: 'This is a brief description of Product 1.',
        price: '$20',
        image: '/path/to/image1.jpg', // Replace with actual image path
    },
    // Add more products as needed
];

function Products() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Function to handle the opening of the modal
    const openModal = (product) => {
        setCurrentProduct(product);
        setModalOpen(true);
    };

    // Function to handle the closing of the modal
    const closeModal = () => {
        setModalOpen(false);
        setCurrentProduct(null);
    };

    return (
        <div className="Products">
            <Navbar />
            <div className="products-container">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <div className='price-custmz-btn-div'>
                            <p className="product-price">{product.price}</p>
                            {/* Customize button */}
                            <button className="customize-btn" onClick={() => openModal(product)}>
                                Customize
                            </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render the CustomizeModal */}
            {isModalOpen && (
                <CustomizeModal
                    product={currentProduct}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default Products;
