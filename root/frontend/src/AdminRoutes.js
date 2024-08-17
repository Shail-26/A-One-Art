import { Routes, Route } from 'react-router-dom';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={
                <>
                    <div className="main-content">
                        <Header />
                        <Sidebar />
                    </div>
                </>
            } />
        </Routes>
    );
};

export default AdminRoutes;