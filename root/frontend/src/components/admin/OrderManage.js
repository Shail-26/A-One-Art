import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/OrderManage.css';

const OrderManagement = () => {
    const host = "http://localhost:5000";
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const dropdownRef = useRef(null); // Reference for the dropdown

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    // Function to detect clicks outside the dropdown
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpenDropdownIndex(null); // Close the dropdown if clicked outside
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
                const response = await fetch(`${host}/fetchorder`, {
                    method: 'GET',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setOrders(data); 
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

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>Error: {error}</div>;

    // Function to determine dropdown options based on status
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

    const changeStatus = async (option,id) => {
        const status = { status: option };
        try {
            const response = await fetch(`${host}/updateorder/${id}`, {
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
            console.error('There was an error fetching the products!', error);
        }
    }

    return (
        <div className="order-management">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Event Name</th>
                            <th>Mobile No.</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.name}</td>
                                <td>{order.event}</td>
                                <td>{order.mobile}</td>
                                <td>{order.desc}</td>
                                <td>
                                    {/* Toggle dropdown on button click */}
                                    <button 
                                        onClick={() => toggleDropdown(index)} 
                                        className={order.status.toLowerCase()}
                                    >
                                        {order.status}
                                    </button>
                                    {/* Conditionally render the dropdown and attach the ref */}
                                    {openDropdownIndex === index && (
                                        <div ref={dropdownRef} className="dropdown-content">
                                            {/* Render options based on status */}
                                            {getDropdownOptions(order.status).map((option, idx) => (
                                                <a key={idx} onClick={() => changeStatus(option, order._id)}>{option}</a>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
