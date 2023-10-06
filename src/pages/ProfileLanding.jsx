import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assests/nxg-logo.png';
import Navbar from '../components/header/Navbar';
import '../components/header/header.scss';

const ProfileLanding = () => {
  return (
    <div className='profile-landing'>
      <header style={{display:"flex", justifyContent:"space-between", alignItems:"center", maxWidth:"80rem", margin:"auto"}}>
        <div className="h-logo" style={{width:"5.5rem", height:"3.2rem"}}>
          <img src={Logo} alt="Nxg Company Logo" className='logo' />
        </div>
        <Navbar />
      </header>
      <div style={{maxWidth: "28rem", margin: "11% 6%", padding: "1rem", fontFamily: "Inter", color: "#fff"}}>
        <h1 style={{fontSize: "2.5rem", fontWeight: "800", lineHeight: "3rem"}}>
          <span style={{color: "#2596be"}}>Connect</span> with Employers, Tech Talents and Agents
        </h1>
        <p style={{fontSize: "0.95rem", fontWeight: "300", lineHeight: "1.3rem", margin: "1rem 0"}}>
          Get started by completing your profile.
        </p>
        <div style={{fontSize: "0.7rem", margin: "1.6rem 0"}}>
          <Link to={"/techtalent"} style={{color: "#fff", fontWeight: "600", border: ".07rem solid #2596be",
             borderRadius: "0.4rem",  padding: ".5rem 2rem", background: "#2596be"}}>
              Complete your profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileLanding