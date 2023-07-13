import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout({handleLogout}) {
  const history = useHistory();
  const Loggedout = () => {
    localStorage.removeItem('token');
    handleLogout();
    history.push('/log-in'); 
  };
  return (
    <div style={{display: "flex",flexDirection:"column",alignItems:"center"}}>
      <h2>Logout</h2>
      <button style={{borderRadius: "10px",border:"1px solid #200648",fontSize:"16px",color:"#fff",padding:"0.5rem 1rem",background:"#430c94"}} onClick={Loggedout}>Logout</button>
    </div>
  );
}

export default Logout;
