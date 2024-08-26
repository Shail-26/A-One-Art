import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Order from './components/Order';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import AdminRoutes from './AdminRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          {/* <Route path="/adminhome" element={
            <>
            <div className="main-content">
              <Header />
              <Sidebar/>
            </div>
          </>
          } /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
