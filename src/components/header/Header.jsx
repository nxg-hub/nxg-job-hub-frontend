import React, { useState } from "react";
import "../header/header.scss";
import Logo from "../../static/images/nxg-logo.png";
import { FiMenu } from "react-icons/fi";
import { GrFormClose } from 'react-icons/gr';
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(true);
  const handleShowMenu = () => {
    setMenu(!menu);
  }
  return (
    <header>
      <div className="h-logo" style={{ width: "160px", height: "65px" }}>
        <img src={Logo} alt="Nxg Company Logo" className="logo" />
      </div>
      <div className="nav-container">
        <nav className={menu ? null : 'nav-show'}>
          <ul>
            <Navbar />
            <div className="nav-btns">
              <NavLink to="/login" className="login-btn">
                Log In
              </NavLink>
              <NavLink to="/register" className="signup-btn">
                Sign Up
              </NavLink>
            </div>
          </ul>
        </nav>
      </div>
      <button id="nav-toggle" onClick={handleShowMenu}>
        {
          menu ? (<FiMenu className="menu-icon" onClick={handleShowMenu} />)
          : (<GrFormClose className="menu-icon"  onClick={handleShowMenu}/>)
        }
      </button>
    </header>
  );
};

export default Header;
