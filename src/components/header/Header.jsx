import React, { useState } from "react";
import "../header/header.scss";
// import Logo from "../../static/images/nxg-logo.png";
import Logo from "../../static/images/splash.png";
import { FiMenu } from "react-icons/fi";
import { GrFormClose } from "react-icons/gr";
import Navbar from "./Navbar";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(true);
  const handleShowMenu = () => {
    setMenu(!menu);
  };
  return (
    <header>
      <div className="h-logo" style={{ width: "160px", height: "65px" }}>
        <Link to={"/"}>
          <img src={Logo} alt="Nxg Company Logo" className="logo" />
        </Link>
      </div>
      <div className="h-logo-mobile" style={{ width: "120px", height: "45px" }}>
        <img src={Logo} alt="Nxg Company Logo" className="logo" />
      </div>
      <div className="nav-container">
        <nav className={menu ? null : "nav-show z-50 fixed !h-full"}>
          <ul className="!justify-center !h-full">
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
      <button id="nav-toggle" onClick={handleShowMenu} className="!z-50">
        {menu ? (
          <FiMenu className="menu-icon" onClick={handleShowMenu} />
        ) : (
          <GrFormClose className="menu-icon" onClick={handleShowMenu} />
        )}
      </button>
    </header>
  );
};

export default Header;
