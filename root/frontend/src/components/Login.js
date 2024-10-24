import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000" ;
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
    const response = await fetch(`${host}/api/auth/login`, {
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
        <div className="register-container">
          <form onSubmit={handleSubmit} className="registration-form">
            <p className="title">Login</p>
            <label>
              <input
                className="input"
                type="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                placeholder=""
                required
              />
              <span>Email</span>
            </label>
            <label>
              <input
                className="input"
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder=""
                required
              />
              <span>Password</span>
            </label>
            <button type="submit" className="submit">Login</button>
            <p className="signin">
              Don't have an account? <a href="/Register">&nbsp;Register</a>
            </p>
          </form>
        </div>
  );
};

export default Login;
