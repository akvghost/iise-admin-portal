import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the login logic here
    if (email && password) {
      console.log("Login details", { email, password });

      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/login",
          {
            userId: email,
            password: password,
          }
        );
        console.log(response);
      } catch (error) {
        console.log("error");
      }
      onLoginSuccess();
      // Call the callback function passed from App.js
    }
  };

  return (
    <div className='admin-login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <div className='login-form-group'>
          <label htmlFor='email'>Email ID </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email ID'
            required
          />
        </div>
        <div className='login-form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            required
          />
        </div>
        <button id='login-btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
