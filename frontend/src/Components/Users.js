import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Users = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        marginTop: 20,
        marginLeft: 10,
        height: 50,
        width: 1070,
        borderRadius: "20px",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Add this to vertically center the content
        padding: '0 20px', // Add padding for better spacing
        transition: 'background-color 0.3s ease', // Add transition for smooth hover effect
        cursor: 'pointer', // Change cursor to pointer on hover
      }}
      onClick={() => {
        navigate("/send" + "?id=" + user._id + "&name=" + user.username);
      }}
    >
      <div
        style={{
          fontSize: '1.90rem',
          lineHeight: '2.75rem',
        }}
      >
        {user.username}
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{
          backgroundColor: 'black',
          color: 'white',
        }}
      >
        Send Money
      </Button>
    </div>
  );
};

export default Users;
