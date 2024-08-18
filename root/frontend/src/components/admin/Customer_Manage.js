import React from 'react'
import '../../assets/styles/customer-manage.css'

const Customer_Manage = () => {
    const customers = [
        { name: 'First name', email: 'example123@gmail.com', phone: '123456789' },
        { name: 'First name', email: 'example123@gmail.com', phone: '123456789' },
        { name: 'First name', email: 'example123@gmail.com', phone: '123456789' },
        { name: 'First name', email: 'example123@gmail.com', phone: '123456789' },
    ];
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
                    <span className="customer-item phone">{customer.phone}</span>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Customer_Manage