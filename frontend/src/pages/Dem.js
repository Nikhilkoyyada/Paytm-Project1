import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { Card, CardContent, TextField, Button } from '@mui/material';
import axios from 'axios';

const Dem = () => {
  const navigate = useNavigate(); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading,setLoading]=useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      navigate("/dashboard");
    } else {
      setLoading(false); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstName,
        lastName,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle signup failure
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 450, padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(192, 213, 224, 0)', backdropFilter: 'blur(20px)', webkitBackdropFilter: 'blur(20px)' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <h1 style={{ fontSize: '3xl', fontWeight: 'semibold', textAlign: 'center', color: 'rgba(107, 114, 128, 1)', marginBottom: 0 }}>Sign Up <span style={{ color: 'rgba(59, 130, 246, 1)' }}> ChatApp</span></h1>
            <TextField
              name="firstName"
              label="First Name"
              variant="standard"
              fullWidth
              margin="normal"
              placeholder="John Doe"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="standard"
              fullWidth
              margin="normal"
              placeholder="John Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              name="username"
              label="Username"
              variant="standard"
              fullWidth
              margin="normal"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              name="password"
              label="Password"
              variant="standard"
              type="password"
              fullWidth
              margin="normal"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <TextField
              name="confirmPassword"
              label="Confirm Password"
              variant="standard"
              type="password"
              fullWidth
              margin="normal"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginBottom: '1rem' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '1rem', backgroundColor: 'black', color: 'white' }}
            >
              Sign Up
            </Button>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Already have an account? <a href="/signin" style={{ color: 'rgba(59, 130, 246, 1)', textDecoration: 'underline' }}>Sign In</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dem;
