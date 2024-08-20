import { Routes, Route } from 'react-router-dom';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Customer_Manage from './components/admin/Customer_Manage';
import Product_Manage from './components/admin/Product_Manage';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={
                <>
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                    </div>
                </>
            } />
            <Route path="/customer-details" element={
                <>
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <Customer_Manage className="customer_manage"/>
                    </div>
                </>
            } />
            <Route path="/product-manage" element={
                <>
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <Product_Manage className="product_manage"/>
                    </div>
                </>
            } />
        </Routes>
    );
};

export default AdminRoutes;