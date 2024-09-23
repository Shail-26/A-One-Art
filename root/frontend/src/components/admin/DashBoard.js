import React, { useState, useEffect } from 'react';
import '../../assets/styles/Dashboard.css';

const Dashboard = () => {
    // State to hold key metrics data
    const [metrics, setMetrics] = useState({
        customers: 0,
        orders: 0,
        revenue: 0,
        products: 0
    });

    // Fetching dashboard data (mock or API call)
    const fetchDashboardData = async () => {
        try {
            // Simulated API response
            const data = {
                customers: 120,
                orders: 50,
                revenue: 12500,
                products: 70
            };
            setMetrics(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    useEffect(() => {
        fetchDashboardData(); // Fetch data on mount
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-metrics">
                <div className="metric-box">
                    <i className="fas fa-users"></i> {/* Add FontAwesome icons here */}
                    <h3>Total Customers</h3>
                    <p>{metrics.customers}</p>
                </div>
                <div className="metric-box">
                    <h3>Total Orders</h3>
                    <p>{metrics.orders}</p>
                </div>
                {/* <div className="metric-box">
                    <h3>Total Revenue</h3>
                    <p>${metrics.revenue}</p>
                </div> */}
                <div className="metric-box">
                    <h3>Products in Stock</h3>
                    <p>{metrics.products}</p>
                </div>
            </div>
            <div className="dashboard-section">
                <h2>Recent Activity</h2>
                <ul className="recent-activity">
                    <li>John Doe placed an order for a Magic Mirror</li>
                    <li>Jane Smith signed up as a new customer</li>
                    <li>New order received for Photo Frame</li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
