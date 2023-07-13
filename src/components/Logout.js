import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/log-in'); 
  };
  return (
    <div>
      <h2>Logout</h2>
      <button className='submit-button' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
