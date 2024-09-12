import React from 'react';
import '../../assets/styles/OrderManage.css';

const OrderManagement = () => {
    const orders = [
        { id: 1, name: "Order 1" },
        { id: 2, name: "Order 2" },
        { id: 3, name: "Order 3" },
        { id: 4, name: "Order 4" },
        { id: 5, name: "Order 5" },
    ];

    return (
        <div className="order-management">
            <h2>Order Management</h2>
            <div className="orders-container">
                {orders.map(order => (
                    <div className="order-item" key={order.id}>
                        <div className="order-name">{order.name}</div>
                        <div className="order-actions">
                            <button className="btn confirm">Confirm</button>
                            <button className="btn pending">Pending</button>
                            <button className="btn complete">Complete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderManagement;
