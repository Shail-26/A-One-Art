import React, { useState, useEffect } from 'react';
import '../../assets/styles/Dashboard.css';
import Background1 from '../../assets/images/background-5.jpg';

const Dashboard = () => {
    const host = "http://localhost:5000"; // Update this with your actual API host if different
    const [loading, setLoading] = useState(true); // State for loading status
    const [metrics, setMetrics] = useState({
        customers: 0,
        event_orders: 0,
        custom_orders: 0,
        products: 0
    });

    // Fetching dashboard data
    const fetchDashboardData = async () => {
        try {
            const response = await fetch(`${host}/api/admin/getallusers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token') // Ensure auth-token exists
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const userData = await response.json();
            // Update the customer metric with the number of users fetched

            const responseOrder = await fetch(`${host}/fetchorder-remain`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            if (!responseOrder.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const orderData = await responseOrder.json();

            const responseCustomProduct = await fetch(`${host}/fetchproductorder-remain`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });

            if (!responseCustomProduct.ok) {
                throw new Error('Failed to fetch product orders');
            }

            const customOrder = await responseCustomProduct.json();


            const responseProduct = await fetch(`${host}/getallproducts`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });

            if (!responseProduct.ok) {
                throw new Error('Network response was not ok');
            }

            const productData = await responseProduct.json();
            
            setMetrics((prevMetrics) => ({
                ...prevMetrics,
                customers: userData.length,
                event_orders: orderData.length,
                custom_orders: customOrder.length,
                products: productData.length
            }));
            setLoading(false); // Stop loading when data is fetched
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false); // Stop loading even on error
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchDashboardData(); // Call the fetch function on component mount
    }, []);

    return (
        <div className="dashboard-container">
            {loading ? (
                <p>Loading...</p> // Show this while loading
            ) : (
                <div className="dashboard-metrics">
                    <div className="metric-box">
                        <i className="fas fa-users"></i>
                        <h3>Total Customers</h3>
                        <p>{metrics.customers}</p>
                    </div>
                    <div className="metric-box">
                        <h3>Event Orders</h3>
                        <p>{metrics.event_orders}</p> {/* Placeholder, update logic if needed */}
                    </div>
                    {/* Optional: Add Revenue if needed */}
                    <div className="metric-box">
                        <h3>Custom Orders</h3>
                        <p>{metrics.custom_orders}</p>
                    </div>  
                    <div className="metric-box">
                        <h3>Products in Stock</h3>
                        <p>{metrics.products}</p> {/* Placeholder, update logic if needed */}
                    </div>
                </div>
            )}

            <div className="dashboard-section">
                <h2>Feedbacks from Customers</h2>
                {/* You can add customer feedback or reviews here */}
            </div>
        </div>
    );
};

export default Dashboard;
