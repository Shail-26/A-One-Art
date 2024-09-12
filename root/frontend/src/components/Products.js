import React from 'react';
import '../assets/styles/Products.css'; // Importing the CSS styles
import Navbar from './Navbar';

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
        id: 2,
        name: 'Product 2',
        description: 'This is a brief description of Product 2.',
        price: '$35',
        image: '/path/to/image2.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is a brief description of Product 2.',
        price: '$35',
        image: '/path/to/image2.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is a brief description of Product 2.',
        price: '$35',
        image: '/path/to/image2.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is a brief description of Product 2.',
        price: '$35',
        image: '/path/to/image2.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is a brief description of Product 2.',
        price: '$35',
        image: '/path/to/image2.jpg',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'This is a brief description of Product 2.',
        price: '$35',
        image: '/path/to/image2.jpg',
    },
    // Add more products as needed
];

function Products() {
    return (
        <div class="Products" >
            <Navbar />
            <div className="products-container">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Products;
