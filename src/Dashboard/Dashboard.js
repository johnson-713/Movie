import React from 'react';
import './Dashboard.css';
import Account from '../Account';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <Account />
    </div>
  )
}

export default Dashboard;
