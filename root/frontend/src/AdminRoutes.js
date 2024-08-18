import { Routes, Route } from 'react-router-dom';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Customer_Manage from './components/admin/Customer_Manage';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={
                <>
                    <Header />
                    <div className="main-content">
                        <Sidebar />
                        <Customer_Manage className="customer_manage"/>
                    </div>
                </>
            } />
        </Routes>
    );
};

export default AdminRoutes;