// Appbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Appbar = ({username}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '100', backgroundColor: '#778899', height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
      <div style={{ fontSize: '24px', color: 'black' }}>
        Payments App
      </div>
      <div style={{ fontSize: '24px', color: 'black' }}>
        <h1>  Welcome  {username}!</h1>
  
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: 'black', color: 'white' }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Appbar;
