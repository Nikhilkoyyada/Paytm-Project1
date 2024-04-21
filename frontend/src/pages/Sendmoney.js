import React, { useState } from 'react';
import { IoIosArrowDropupCircle } from 'react-icons/io';
import axios from "axios"
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sendmoney = () => {
  const [searchParams] = useSearchParams();
  const name=searchParams.get("name")
  const id=searchParams.get("id")
  const [amount,setAmout]=useState()
  const navigate = useNavigate(); 
  const handletransfer = (e) => {
    e.preventDefault();
    console.log("Transferring...");
    axios.post("http://localhost:3000/api/v1/account/transfer", {
      "amount": amount,
      "to": id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Response data:', response.data);
        if (response.data.message === "Transfer successful") {
         
       
    
        
     
          navigate("/dashboard");
          toast.success("Transfer successfull")
         
        } else {
          toast.error(response.data.message || 'An error occurred while transferring money.');
        }
      } else {
        toast.error('An error occurred while transferring money.');
      }
    })
    .catch(err => {
      console.error('Error transferring money:', err);
      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message === "Insufficient balance") {

          toast.error('Insufficient balance. Please try again.');
        } else {
          toast.error(err.response.data.message);
        }
      } else {
        toast.error('An error occurred while transferring money.');
      }
    });
  }
  
  
  return (
    <div className='sendmoney' style={{ margin:0,backgroundColor:'#696969',display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width:"100vw"}}>
      <Card style={{ Width: 600 }}>
        <CardContent>
          <form >
          <h1 style={{  marginTop:30,display:'flex',justifyContent:'center',alignItems:'center', marginTop:5,marginBottom:0,fontSize:40}}>SendMoney</h1>
          
          <div style={{ display: 'flex', alignItems: 'center' ,marginTop:40}}>
        <IoIosArrowDropupCircle style={{ color: 'green', fontSize: '3em' }} />
        <div style={{ marginLeft: 10 }}>
          <h1 style={{ margin: 0 }}>{name}</h1>
        </div>
      </div>
      <div >
        <div style={{marginLeft:0,marginTop:30}}>
           <p style={{fontSize:20,marginTop:10}}>Enter Amount:</p>
        </div>
        <div>
        <TextField
    name="Email"
    label="Enter Amount in Ruppes"
    variant="outlined"
    fullWidth
    margin="normal"
   onChange={(e)=>{
    setAmout(e.target.value)
   }}
  
    style={{marginTop:0,marginBottom:20}}
  />
          
        </div>
      </div>
         <Button
     type="submit"
     variant="contained"
    color="primary"
    fullWidth
    style={{ marginTop: 20, backgroundColor: 'green', color: 'white' }} 
   onClick={handletransfer}
   >
 SendMoney
</Button>


          </form>
        </CardContent>
      </Card>
     
    </div>
  );
};

export default Sendmoney;
