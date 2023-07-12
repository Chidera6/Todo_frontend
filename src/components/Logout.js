import React from 'react';
import { useHistory } from 'react-router-dom';
import { csrfFetch } from '../csrf';

function Logout() {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      const response = await csrfFetch('api/users/logout', {
        method: 'DELETE', 
      });
      history.push('/login'); 
      if (response.ok) {
        history.push('/login'); 
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
