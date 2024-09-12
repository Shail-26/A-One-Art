import React, { useState, useEffect } from 'react';
import '../../assets/styles/OrderManage.css';

const OrderManagement = () => {
    const host = "http://localhost:5000";
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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



    return (
        <div className="order-management">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.name}</td>
                                <td>{order.event}</td>
                                <td>{order.desc}</td>
                                <td>
                                    <button className={order.status.toLowerCase()}>
                                        {order.status}
                                    </button>
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
