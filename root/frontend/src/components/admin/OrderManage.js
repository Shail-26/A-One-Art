import React, { useState, useEffect, useRef } from 'react';
import AssignPersonModal from './AssignPersonModal';
import '../../assets/styles/OrderManage.css';

const OrderManagement = () => {
    const host = "http://localhost:5000";
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [isAssignModalOpen, setAssignModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [assignedPersons, setAssignedPersons] = useState({}); // Change to an object

    const dropdownRef = useRef(null); 

    const toggleDropdown = (index) => {
        setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    };

    const openAssignModal = (order) => {
        setCurrentOrder(order);
        setAssignModalOpen(true);
    };

    const closeAssignModal = () => {
        setAssignModalOpen(false);
        setCurrentOrder(null);
    };

    const assignPerson = (person, orderId) => {
        setAssignedPersons((prevPersons) => ({
            ...prevPersons,
            [orderId]: [...(prevPersons[orderId] || []), person] // Assign new person to the order
        }));
    };

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownIndex(null); 
            }
        });

        return () => {
            document.removeEventListener('mousedown', () => {});
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
            setOrders((prevOrders) => 
                prevOrders.map((order) => 
                    order._id === id ? { ...order, status: option } : order
                )
            );
        } catch (error) {
            console.error('There was an error fetching the products!', error);
        }
    }

    const formatDate = (dateRangeString) => {
        const [startDate, endDate] = dateRangeString.split(' to ');
        const cleanStartDate = startDate.split(', ').slice(1, 3).join(', ');
        const cleanEndDate = endDate.split(', ').slice(1, 3).join(', ');
        return `${cleanStartDate} to ${cleanEndDate}`;
    };

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
                            <th>Date</th>
                            <th>Status</th>
                            <th>Assign</th>
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
                                <td>{formatDate(order.event_date)}</td>
                                <td>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleDropdown(index); }} 
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
                                <td onClick={() => openAssignModal(order)}>
                                    {assignedPersons[order._id] && assignedPersons[order._id].length > 0 ? (
                                        <span className="assigned-tick">✔</span>
                                    ) : (
                                        <span className="assigned-cross">✘</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isAssignModalOpen && (
                <AssignPersonModal 
                    closeModal={closeAssignModal} 
                    order={currentOrder}
                    assignPerson={assignPerson}
                    assignedPersons={assignedPersons}
                />
            )}
        </div>
    );
};

export default OrderManagement;
