import React, { useState, useEffect } from 'react';
import '../../assets/styles/product-manage.css';
import '../../assets/styles/modal.css';
import ReviewModal from './ReviewModal';

const Product_Manage = () => {
    const host = "http://localhost:5000";
    const [isOpen, setIsOpen] = useState(false);
    const [prod, setProd] = useState({id:"", ename:"", edesc:"", eprice:"", eimage:""});
    const [isEditOpen, setEditIsOpen] = useState(false);
    const [isDeleteOpen, setDeleteIsOpen] = useState(false); // Manage delete confirmation popup
    const [isReviewModalOpen, setReviewModalOpen] = useState(false); // New state for review modal
    const [deleteProdId, setDeleteProdId] = useState(null); // Store the product ID to be deleted    
    const [currentProduct, setCurrentProduct] = useState(null);
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

    const openEditModal = (currentProd) => {
        setProd({
            id: currentProd._id,
            ename: currentProd.name,
            edesc: currentProd.desc,
            eprice: currentProd.price,
            eimage: currentProd.image
        });
        setEditIsOpen(true);
    };

    const closeEditModal = () => {
        setEditIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.id === 'myModal') {
                closeModal();
                closeEditModal();
                closeDeleteModal();
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const openDeleteModal = (productId) => {
        setDeleteProdId(productId);
        setDeleteIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setAddProd(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));

        setProd(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value
        }));
    };

    const [showProd, setShowProd] = useState([]);
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
                    'auth-token': localStorage.getItem('auth-token')
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Product added:', result);
            closeModal();
            fetchProducts();
        } catch (error) {
            console.error('There was an error adding the product!', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', prod.ename);
        formData.append('desc', prod.edesc);
        formData.append('price', prod.eprice);
        if (prod.eimage) formData.append('image', prod.eimage); // Append image only if it exists
    
        try {
            const response = await fetch(`${host}/api/admin/updateproduct/${prod.id}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Product updated:', result);
            closeEditModal();
            fetchProducts();
        } catch (error) {
            console.error('There was an error updating the product!', error);
        }
    };

    const confirmDeleteProduct = async () => {
        try {
            const response = await fetch(`${host}/api/admin/deleteproduct/${deleteProdId}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            console.log('Product deleted:', result);
            closeDeleteModal();
            fetchProducts();
        } catch (error) {
            console.error('There was an error deleting the product!', error);
        }
    };

    const openReviewModal = (product) => {
        setCurrentProduct(product);
        setReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setReviewModalOpen(false);
        setCurrentProduct(null);
    };

    return (
        <div className="product-manage-main-content">
            <div className="add-btn-cont">
                <button id="openModalBtn" className="add-product-btn" onClick={openModal}>Add Product</button>
            </div>

            {isOpen && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Add Product</h2>
                        <form id="modalForm" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" className="input-field" name="name" onChange={handleChange} required /><br />

                            <label htmlFor="desc">Description:</label>
                            <textarea id="desc" className="textarea-field" name="desc" onChange={handleChange} required></textarea><br />
                            
                            <label htmlFor="price">Price:</label>
                            <input type="text" id="price" className="input-field" name="price" onChange={handleChange} required /><br />

                            <label htmlFor="image">Image:</label>
                            <input type="file" id="image" name="image" className="input-field" onChange={handleChange} accept=".jpg, .jpeg, .png, .heic" required /><br />

                            <button type="submit" className="btn-submit" >Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {isEditOpen && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeEditModal}>&times;</span>
                        <h2>Edit Product</h2>
                        <form id="modalForm" method="post" onSubmit={handleEditSubmit} encType="multipart/form-data">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" className="input-field" value={prod.ename} name="ename" onChange={handleChange} required /><br />

                            <label htmlFor="desc">Description:</label>
                            <textarea id="desc" className="textarea-field" value={prod.edesc} name="edesc" onChange={handleChange} required></textarea><br />
                            
                            <label htmlFor="price">Price:</label>
                            <input type="text" id="price" className="input-field" value={prod.eprice} name="eprice" onChange={handleChange} required /><br />

                            <label htmlFor="image">Image:</label>
                            <input type="file" id="image" name="eimage" className="input-field" onChange={handleChange} accept=".jpg, .jpeg, .png, .heic" /><br />

                            <button type="submit" className="btn-submit" >Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteOpen && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeDeleteModal}>&times;</span>
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <button className="btn-delete" onClick={confirmDeleteProduct}>Yes, Delete</button>
                        <button className="btn-cancel" onClick={closeDeleteModal}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="product-cards">
                {showProd.map((prod, index) => (
                    <div key={index} className="product-card">
                        <div className='product-image'>
                            <img className="product-img" alt={prod.name} src={`${host}/${prod.image}`} onClick={() => openReviewModal(prod)}></img>
                        </div>
                        <div className="product-details">
                            <p className="product-name">{prod.name}</p>
                            <p className="product-price">Rs. {prod.price}</p>
                            <div className="product-actions">
                                <button id="openModalBtn" className="edit-btn" onClick={() => openEditModal(prod)}>Edit</button>
                                <button className="delete-btn" onClick={() => openDeleteModal(prod._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isReviewModalOpen && (
                <ReviewModal
                    product={currentProduct}
                    closeModal={closeReviewModal}
                />
            )}
        </div>
    )
}

export default Product_Manage;
