import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/OrderManage.css';

const OrderManagement = () => {
    const host = "http://localhost:5000";
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    // Function to open the modal with the selected image
    const handleImageClick = (imagePath) => {
        setImageSrc(`${host}/${imagePath}`);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setImageSrc(null);
    };

    const dropdownRef = useRef(null);

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdownIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${host}/fetchproductorder`, {
                    method: 'GET',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setOrders(data); // Set orders fetched from API
                } else {
                    throw new Error(data.message || 'Failed to fetch orders');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading custom product orders...</div>;
    if (error) return <div>Error: {error}</div>;

    const getDropdownOptions = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return ['In Progress', 'Completed'];
            case 'in progress':
                return ['Cancelled', 'Completed'];
            case 'completed':
                return ['In Progress', 'Cancelled'];
            case 'cancelled':
                return ['In Progress', 'Completed'];
            default:
                return [];
        }
    };

    const changeStatus = async (option, id) => {
        
    };

    return (
        <div className="order-management">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Custom Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.customName || 'N/A'}</td>
                                <td>{order.customDescription || 'N/A'}</td>
                                <td>
                                    {order.customImage ? (
                                        <button
                                            onClick={() => handleImageClick(order.customImage)}
                                            className="image-preview-btn"
                                        >
                                            Preview Image
                                        </button>
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>
                                    <button 
                                        onClick={() => toggleDropdown(index)} 
                                        // className={order.status.toLowerCase()}
                                    >
                                        {order.status}
                                    </button>
                                    {openDropdownIndex === index && (
                                        <div ref={dropdownRef} className="dropdown-content">
                                            {getDropdownOptions(order.status).map((option, idx) => (
                                                <a key={idx} onClick={() => changeStatus(option, order._id)}>{option}</a>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    {/* Image Preview Modal */}
                    {isModalOpen && (
                        <div className="modal-overlay" onClick={handleCloseModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <img src={imageSrc} alt="Custom Order Preview" className="preview-image" />
                                <button className="close-modal-btn" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    )}
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
