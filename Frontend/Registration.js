import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Registration = () => {
  const navigate = useNavigate();
  const [uname, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateAndRegister = (e) => {
    e.preventDefault();

    if (!uname.trim() || !pass.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    axios.post('http://localhost:3001/create', {
      uname: uname,
      pass: pass,
    }).then(() => {
      console.log('Registration successful');
      navigate("/login");
    });
  }

  return (
    <div>
      <h1>REGISTRATION DETAILS</h1>
      <form onSubmit={validateAndRegister}>
        <label>User Name</label><br />
        <input type="text" name="uname" onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Password</label><br />
        <input type="password" name="pass" onChange={(e) => setPassword(e.target.value)} />
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
