// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import '../assets/styles/forall.css';
// import '../assets/styles/Register.css';

// const Register = () => {
//   const [credentials, setCredentials] = useState({
//     name: '',
//     email: '',
//     password: '',
//     cpassword:'',
//     mobile: '',
//     location: ''
//   });
//   let navigate=useNavigate();

//   const onChange = (e) => {
//     setCredentials({...credentials, [e.target.name]: e.target.value})
//   } 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const {name, email, password, mobile, location} = credentials;
//     if(credentials.password!==credentials.cpassword){
//         alert("Passwords must match")
//         return;
//     }
//     const response = await fetch("http://localhost:5000/api/auth/createuser", {
//         method:"POST",
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//         body:JSON.stringify({name, email, password, mobile, location})
//     });

//     const json = await response.json() 
//     console.log(json);
//     if(json.success){
//         //redirect
//         localStorage.setItem('token', json.authtoken);
//         navigate("/Login");
//         alert("Account Created Successfully")
//     } else {
//         alert("Invalid Details")
//     }
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="register-container">
//           <h2>Register</h2>
//           <form onSubmit={handleSubmit} className="register-form">
//             {/* <div className="form-group">
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={form.username}
//                 onChange={onChange}
//                 required
//               />
//             </div> */}
//             <div className="form-group">
//               <label htmlFor="name">Name:</label>
//               <input type="text" id="name" name="name" value={credentials.name} onChange={onChange} required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="email">Email:</label>
//               <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password:</label>
//               <input type="password" id="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={credentials.password} onChange={onChange} required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Confirm Password:</label>
//               <input type="text" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="mobile">Mobile:</label>
//               <input type="tel" id="mobile" name="mobile" pattern="[1-9]{1}[0-9]{9}" value={credentials.mobile} onChange={onChange} required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="location">Location:</label>
//               <input type="text" id="location" name="location" value={credentials.location} onChange={onChange} required/>
//             </div>
//             <button type="submit">Register</button>
//           </form>
//           <p className="already-p">
//             Already have an account? <a href="/Login">&nbsp;Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../assets/styles/forall.css';
import '../assets/styles/Register.css';

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    mobile: '',
    location: ''
  });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, mobile, location } = credentials;
    if (password !== credentials.cpassword) {
      alert("Passwords must match");
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, mobile, location })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/Login");
      alert("Account Created Successfully");
    } else {
      alert("Invalid Details");
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <p className="title">Register</p>
      <p className="message">Signup now and get full access to our shop.</p>
      <label>
        <input
          className="input"
          type="text"
          name="name"
          value={credentials.name}
          onChange={onChange}
          placeholder=""
          required
        />
        <span>Name</span>
      </label>

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

      <label>
        <input
          className="input"
          type="password"
          name="cpassword"
          value={credentials.cpassword}
          onChange={onChange}
          placeholder=""
          required
        />
        <span>Confirm password</span>
      </label>

      <label>
        <input
          className="input"
          type="tel"
          name="mobile"
          value={credentials.mobile}
          onChange={onChange}
          placeholder=""
          required
        />
        <span>Phone Number</span>
      </label>

      <label>
        <input
          className="input"
          type="text"
          name="location"
          value={credentials.location}
          onChange={onChange}
          placeholder=""
          required
        />
        <span>Location</span>
      </label>

      <button className="submit">Submit</button>
      <p className="signin">Already have an account? <a href="/Login">Signin</a></p>
    </form>
  );
};

export default Register;
