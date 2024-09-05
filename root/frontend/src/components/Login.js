import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  let navigate=useNavigate();

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method:"POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify({email: credentials.email, password:credentials.password})
    });
    const json = await response.json() 
    console.log(json);
    if(json.success && json.isAdmin){
      localStorage.setItem('auth-token', json.authtoken);
      localStorage.setItem('admin', true);
      
      navigate("/admin/home");
    } else if(json.success){
        //redirect
      localStorage.setItem('auth-token', json.authtoken);
      navigate("/home");
    } else{
      alert("Invalid Credentials")
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="register-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="already-p">
            Don't have an account? <a href="/Register">&nbsp;Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
