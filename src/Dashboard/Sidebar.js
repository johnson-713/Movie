import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const storedUser = localStorage.getItem('username')
    if(storedUser){
      setUser(storedUser)
    }
  }, [])

  const handleTiming = () => {
    navigate('/theatres');
  }

  const handleAccount = () => {
    navigate('/dashboard')
  }

  const handleSeats = () => {
    navigate('/seats')
  }
  return (
    <div className='sidebar'>
      <h3 id='title'>Hi, {user}</h3>
      <button className={location.pathname === '/dashboard' ? 'active' : ''} onClick={handleAccount}>Account</button>
      <button className={location.pathname === '/theatres' ? 'active' : ''} onClick={handleTiming}>Theatres</button>
      <button className={location.pathname === '/seats' ? 'active' : ''} onClick={handleSeats}>Seats</button>
      <div style={{ borderTop: "2px solid white",width: '80%'}}></div>
    </div>
  )
}

export default Sidebar;
