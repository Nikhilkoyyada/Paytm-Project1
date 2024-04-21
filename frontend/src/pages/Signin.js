import React, { useState,useEffect } from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();

  const [loading,setLoading]=useState(true)
  const [formData, setFormData] = useState({
    username: '', 
    password: '', 
  });
  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(token){
      navigate("/dashboard")
    }
    else {
      setLoading(false); 
    }
  },[])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username: formData.username, 
        password: formData.password,
      });
      if (response.data.message === "Login successfull") {
        console.log("successfully logged in");
        toast.success("Login successful");
        const username=formData.username
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard',{state:{username}});
      }
      else {
        console.log("Error while logging in");
        toast.error("Error while logging in");
      }
    } catch (error) {
      console.log("catch")
      toast.error("Error while logging in");
      console.error('Signin failed:', error);
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
    <div  className="signin-container" style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 450, padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(192, 213, 224, 0)', backdropFilter: 'blur(20px)', webkitBackdropFilter: 'blur(20px)' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <h1 style={{ marginTop: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 0, fontSize: 40 }}>Sign In</h1>
            <p style={{ fontSize: '8xl', fontWeight: 'semibold', textAlign: 'center', color: 'rgba(107, 114, 128, 1)', marginBottom: 0 }}>Enter your credentials to access your account</p>
            <TextField
              name="username"
              label="Username"
              variant="standard"
              fullWidth
              margin="normal"
              value={formData.username} 
              onChange={handleChange} 
              style={{ marginTop: 30 }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange} 
              style={{ marginTop: 30 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: 20, backgroundColor: 'black', color: 'white' }}
            >
              Sign In
            </Button>
            <p style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              Don't have an account? <a href="/">Sign up</a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
