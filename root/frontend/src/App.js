import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/home" element={
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
