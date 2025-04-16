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
    const [assignedPersons, setAssignedPersons] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

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
        setAssignedPersons((prevPersons) => {
            const updatedPersons = {
                ...prevPersons,
                [orderId]: [...(prevPersons[orderId] || []), person],
            };
            console.log('Updated Assigned Persons:', updatedPersons);
            return updatedPersons;
        });
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
                        'auth-token': localStorage.getItem('auth-token'),
                    },
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
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify(status),
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
            console.error('There was an error updating the status!', error);
        }
    };

    const formatDate = (dateRangeString) => {
        const [startDate, endDate] = dateRangeString.split(' to ');
        const cleanStartDate = startDate.split(', ').slice(1, 3).join(', ');
        const cleanEndDate = endDate.split(', ').slice(1, 3).join(', ');
        return `${cleanStartDate} to ${cleanEndDate}`;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const paginatedOrders = orders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    if (loading) return <div>Loading orders...</div>;
    if (error) return <div>Error: {error}</div>;

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
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedOrders.map((order, index) => (
                            <tr key={index}>
                                <td onClick={() => openAssignModal(order)}>
                                    {(currentPage - 1) * ordersPerPage + index + 1}
                                </td>
                                <td onClick={() => openAssignModal(order)}>
                                    {order.name}
                                </td>
                                <td onClick={() => openAssignModal(order)}>
                                    {order.event}
                                </td>
                                <td onClick={() => openAssignModal(order)}>
                                    {order.mobile}
                                </td>
                                <td onClick={() => openAssignModal(order)}>
                                    {order.desc}
                                </td>
                                <td onClick={() => openAssignModal(order)}>
                                    {formatDate(order.event_date)}
                                </td>
                                <td>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleDropdown(index);
                                        }}
                                        className={order.status.toLowerCase()}
                                    >
                                        {order.status}
                                    </button>
                                    {openDropdownIndex === index && (
                                        <div ref={dropdownRef} className="dropdown-content">
                                            {getDropdownOptions(order.status).map(
                                                (option, idx) => (
                                                    <a
                                                        key={idx}
                                                        onClick={() => changeStatus(option, order._id)}
                                                    >
                                                        {option}
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
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
