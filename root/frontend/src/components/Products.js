// import React, { useState, useEffect } from 'react';
// import '../assets/styles/Products.css'; // Importing the CSS styles
// import Navbar from './Navbar';
// import CustomizeModal from './CustomizeModal'; // Importing the modal component

// // Example array of products (you can replace this with real data)

// function Products() {
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [currentProduct, setCurrentProduct] = useState(null);
//     const [showProd, setShowProd] = useState([]);

//     const host = "http://localhost:5000";
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`${host}/getallproducts`, {
//                 method: 'GET',
//                 headers: {
//                     'auth-token': localStorage.getItem('auth-token')
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             setShowProd(data); // Update state with fetched products
//         } catch (error) {
//             console.error('There was an error fetching the products!', error);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     // Function to handle the opening of the modal
//     const openModal = (product) => {
//         setCurrentProduct(product);
//         setModalOpen(true);
//     };

//     // Function to handle the closing of the modal
//     const closeModal = () => {
//         setModalOpen(false);
//         setCurrentProduct(null);
//     };

//     return (
//         <div className="Products">
//             <Navbar />
//             <div className="products-container">
//                 {showProd.map((product, index) => (
//                     <div className="product-card" key={index}>
//                         <img src={`${host}/${product.image}`} alt={product.name} className="product-image" />
//                         <div className="product-details">
//                             <h2 className="product-name">{product.name}</h2>
//                             <p className="product-description">{product.desc}</p>
//                             <div className='price-custmz-btn-div'>
//                                 <p className="product-price">{product.price}</p>
//                                 {/* Customize button */}
//                                 <button className="customize-btn" onClick={() => openModal(product)}>
//                                     Customize & Order
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Render the CustomizeModal */}
//             {isModalOpen && (
//                 <CustomizeModal
//                     product={currentProduct}
//                     closeModal={closeModal}
//                 />
//             )}
//         </div>
//     );
// }

// export default Products;

import React, { useState, useEffect } from 'react';
import '../assets/styles/Products.css'; // Importing the CSS styles
import Navbar from './Navbar';
import CustomizeModal from './CustomizeModal'; // Importing the modal component
import ReviewModal from './ReviewModal'; // Importing the review modal component

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

    // Function to handle the opening of the Customize modal
    const openCustomizeModal = (product) => {
        setCurrentProduct(product);
        setCustomizeModalOpen(true);
    };

    // Function to handle the opening of the Review modal
    const openReviewModal = (product) => {
        setCurrentProduct(product);
        setReviewModalOpen(true);
    };

    // Function to handle the closing of the modals
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
            <div className="products-container">
                {showProd.map((product, index) => (
                    <div className="product-card" key={index}>
                        <img 
                            src={`${host}/${product.image}`} 
                            alt={product.name} 
                            className="product-image"
                            onClick={() => openReviewModal(product)} // Open review modal on click
                        />
                        <div className="product-details">
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-description">{product.desc}</p>
                            <div className='price-custmz-btn-div'>
                                <p className="product-price">{product.price}</p>
                                {/* Customize button */}
                                <button className="customize-btn" onClick={() => openCustomizeModal(product)}>
                                    Customize & Order
                                </button>
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

