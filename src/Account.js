import React from 'react';
import './Account.css';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    localStorage.removeItem('selectedSeats')
    localStorage.removeItem('selectedScreen')
    localStorage.removeItem('selectedMovie')
    localStorage.removeItem('selectedTheatre')
    navigate('/');
  }
  return (
    <div className='account'>
      <button onClick={handleDelete}>Delete your account</button>
      <p style={{marginRight: '60px'}}>This will lead to login screen</p>
    </div>
  )
}

export default Account;
