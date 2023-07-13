import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./form.css";

function Login({handleLogin}) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const login = async (email, password) => {
    await fetch('https://todobackend-ew9a.onrender.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        setEmail('');
        setPassword('');
        handleLogin(data.user);
        localStorage.setItem('token', data.token); 
        history.push('/todos');
      })
      .catch((err) => {
        console.log(err.message);
     });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h2>Log in Form</h2>
        <div className='input-details'>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className='input-details'>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="text"
          />
        </div>
        <button className="form-submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
