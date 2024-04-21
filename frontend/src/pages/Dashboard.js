// Dashboard.js
import React, { useEffect, useState } from 'react';
import Appbar from '../Appbar';
import axios from "axios";
import Users from '../Components/Users';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [balance, setBalance] = useState();
 const location=useLocation();
 const {username}=location.state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setUsers(response.data.user);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [filter]);

  return (
    <div className='dashboard'>
      <Appbar username={username}/>
      <div style={{ paddingTop: '100px', marginLeft: '10px' }}>
  
        <p style={{ fontSize: '30px', margin: '0', marginBottom: '10px' }}>Your balance: <span style={{ fontWeight: 'bold' }}>{balance}</span></p>
        <input
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '10px', borderRadius: '20px', border: '1px solid #ccc', width: '70%', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        {users.map(user => <Users key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default Dashboard;
