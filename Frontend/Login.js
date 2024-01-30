import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [uname, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null); // State to track login errors
  const navigate = useNavigate();

  const Login = (e) => {
    e.preventDefault();
    
    // Reset login error state on each login attempt
    setLoginError(null);

    axios.post('http://localhost:3001/login', {
      uname: uname,
      pass: pass,
    }).then(response => {
      console.log(response.data);
      // Redirect to another page after successful login
      navigate("/dashboard");
    }).catch(error => {
      console.error(error.response.data);

      // Update state to display login error message
      setLoginError("Invalid credentials. Please try again.");

      // Handle unsuccessful login (display an error message, for example)
    });
  }

  return (
    <div>
      <h1>LOGIN</h1>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <form onSubmit={Login}>
        <label>User Name</label><br />
        <input type="text" name="uname" onChange={(e) => setName(e.target.value)} />
        <br />
        <label>Password</label><br />
        <input type="password" name="pass" onChange={(e) => setPassword(e.target.value)} />
        <br /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
