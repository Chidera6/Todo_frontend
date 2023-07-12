import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from '../csrf';
import "./form.css";

function Login({handleLogin}) {
  const history = useHistory();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const login = async (credential, password) => {

    await csrfFetch('api/users/login', {
      method: 'POST',
      body: JSON.stringify({ credential, password })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCredential('');
        setPassword('');
        handleLogin(data.user);
        history.push('/');
      })
      .catch((err) => {
        console.log(err.message);
     });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credential, password);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h2>Log in Form</h2>
        <div className='input-details'>
          <input
            id="credential"
            type="text"
            onChange={(e) => setCredential(e.target.value)}
            value={credential}
            placeholder="Username or Email"
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
