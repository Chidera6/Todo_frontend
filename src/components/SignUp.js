import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./form.css";

function SignUp({handleLogin}) {
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async (username, email, password) => {
    await fetch('http://localhost:5000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        setUserName('')
        setEmail('');
        setPassword('');
        handleLogin(data.user);
        history.push('/');
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, email, password);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h2>Sign up Form</h2>
        <div className='input-details'>
          <input
            id="username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            placeholder="Username"
          />
        </div>
        <div className='input-details'>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            type="text"
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

export default SignUp;
