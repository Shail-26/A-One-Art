import React, { useState, useEffect } from 'react';
import '../../assets/styles/customer-manage.css'

const Customer_Manage = () => {
    const host = "http://localhost:5000"
    const [customers, setCustomers] = useState([]);
    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${host}/api/admin/getallusers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' :  localStorage.getItem('auth-token')
                }
            });
            if (!response.ok) {
                const text = await response.text(); // Read the response as text
                throw new Error(`Network response was not ok: ${text}`);
            }
            const data = await response.json();
            setCustomers(data);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };
    useEffect(() => {
        fetchCustomers();
        // eslint-disable-next-line 
    }, []);
    
    return (
        <div className="customer-manage-container">
            <div className="customer-details">
            <div className="customer-header">
                <span className="header-item name">Name</span>
                <span className="header-item email">Email</span>
                <span className="header-item phone">Phone</span>
            </div>
            {customers.map((customer, index) => (
                <div key={index} className="customer-row">
                    <span className="customer-item name">{customer.name}</span>
                    <span className="customer-item email">{customer.email}</span>
                    <span className="customer-item phone">{customer.mobile}</span>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Customer_Manage