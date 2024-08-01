import React, { useState } from 'react';
import './Register.css';
import './forall.css';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    mobile: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', form);
  };

  return (
    <div class="card">
        <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={form.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile:</label>
          <input 
            type="tel" 
            id="mobile" 
            name="mobile" 
            value={form.mobile} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input 
            type="text" 
            id="location" 
            name="location" 
            value={form.location} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
          Already have an account? <a href="/Login">Login</a>
    </p>
    </div>
</div>
    
  );
};

export default Register;
