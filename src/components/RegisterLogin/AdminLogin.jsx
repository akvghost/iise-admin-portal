import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function AdminLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginDetails, setLoginDetails] = useState({
    userId: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the login logic here
    console.log(loginDetails);

    const toastId = toast.loading("Let's Get You In", {
      position: "bottom-right",
      duration: 4000,
    });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/login",
        loginDetails
      );
      console.log(response);
      if (response.data.status.success) {
        toast.success(`Welcome ${response.data.data} 👋`, {
          id: toastId,
          position: "bottom-right",
          duration: 4000,
        });
        setTimeout(() => {
          onLoginSuccess();
        }, 1500);
      } else {
        toast.error(`${response.data.data}`, {
          id: toastId,
          position: "bottom-right",
          duration: 4000,
        });
      }
    } catch (error) {
      console.log("error");
    }
    // onLoginSuccess();
    // Call the callback function passed from App.js
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
            value={loginDetails.userId}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, userId: e.target.value })
            }
            placeholder='Enter your email ID'
            required
          />
        </div>
        <div className='login-form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            placeholder='Enter your password'
            required
          />
        </div>
        <button id='login-btn' type='submit'>
          Login
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default AdminLogin;
