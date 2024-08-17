import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Sidebar from './components/admin/Sidebar';
import Header from './components/admin/Header';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/adminhome" element={
            <>
            <div className="main-content">
              <Header />
              <Sidebar/>
            </div>
          </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
