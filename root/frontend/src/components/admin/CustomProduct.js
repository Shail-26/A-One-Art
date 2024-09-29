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
    const [users, setUsers] = useState({}); // Object to store user details by ID

    const dropdownRef = useRef(null);

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

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data); // Set orders fetched from API

                // Fetch user details for each order
                const userPromises = data.map(order =>
                    fetch(`${host}/api/admin/getuser/${order.user}`, {
                        method: 'GET',
                        headers: {
                            'auth-token': localStorage.getItem('auth-token')
                        }
                    }).then(res => res.json())
                );

                const usersData = await Promise.all(userPromises);

                // Store user details in an object keyed by user ID
                const usersObj = usersData.reduce((acc, user) => {
                    acc[user._id] = user;
                    return acc;
                }, {});

                setUsers(usersObj);
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
        const status = { status: option };
        try {
            const response = await fetch(`${host}/updatecustomproduct/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(status)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Order status updated successfully", data);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, status: option } : order
                )
            );
        } catch (error) {
            console.error('There was an error updating the order status!', error);
        }
    };

    return (
        <div className="order-management">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>User Name</th>
                            <th>Mobile</th>
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
                                <td>{users[order.user] ? users[order.user].name : 'Loading...'}</td> {/* Display user name */}
                                <td>{users[order.user] ? users[order.user].mobile : 'Loading...'}</td> {/* Display user mobile */}
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
                                        className={order.status.toLowerCase()}
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
