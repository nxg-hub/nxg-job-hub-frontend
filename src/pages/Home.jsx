import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header/Header'


const Home = () => {
  return (
    <div className='landing-main'>
      <Header />
      <div className="landing-content">
        <h1 className='land-title'><span>Connect</span> with Employers, Tech Talents and Agents</h1>
        <p className="land-text">
          Get access and connect with Professionals, Tech talents, and agents in just a few clicks.
        </p>
        <div className="land-btns">
          <Link to={"/techtalent"} className='join-btn'>Join Us</Link>
        </div>
      </div>
      
    </div>
  )
}

export default Home