import React, { useState, useEffect } from 'react';
import '../../assets/styles/product-manage.css';
import '../../assets/styles/modal.css';

const Product_Manage = () => {
    const host = "http://localhost:5000";
    const [isOpen, setIsOpen] = useState(false);
    const [addProd, setAddProd] = useState({
        name: '',
        desc: '',
        price: '',
        image: null
    });

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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setAddProd(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', addProd.name);
        formData.append('desc', addProd.desc);
        formData.append('price', addProd.price);
        formData.append('image', addProd.image);

        try {
            const response = await fetch(`${host}/api/admin/addproduct`, {
                method: 'POST',
                body: formData,
                headers: {
                    'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiZDlmODY4MTU5OTQ5MzI0NWNjNjg3In0sImlhdCI6MTcyMzcwMzM1MH0.cBy7zaGjGd71Nv1koEVZ_uwQU-p7BEifQQKXm4I7rFk'
                }
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Product added:', result);
            closeModal();
            // Optionally, refresh the product list here
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };
    

    

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
                        <h2>Add Product</h2>
                        <form id="modalForm" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" className="input-field" name="name" onChange={handleChange} required /><br />

                            <label htmlFor="desc">Description:</label>
                            <textarea id="desc" className="textarea-field" name="desc" onChange={handleChange} required></textarea><br />
                            
                            <label htmlFor="price">Price:</label>
                            <input type="price" id="price" className="input-field" name="price" onChange={handleChange} required /><br />

                            <label htmlFor="image">Image:</label>
                            <input type="file" id="image" name="image" className="input-field" onChange={handleChange} accept=".jpg, .jpeg, .png, .heic" required /><br />

                            <button type="submit" className="btn-submit" >Submit</button>
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