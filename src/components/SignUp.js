import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from '../csrf';

function SignUp() {
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = async (username, email, password) => {
    await csrfFetch('api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    })
      .then((response) => response.json())
      .then(() => {
        setUserName('');
        setEmail('');
        setPassword('');
        history.push('/');
      })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, email, password);
  };

  return (
    <div className="form-container">
      <h2>Sign up Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="text"
          />
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
