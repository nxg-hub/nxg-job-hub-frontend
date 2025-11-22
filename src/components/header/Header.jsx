import React, { useState } from "react";
import "../header/header.scss";
// import Logo from "../../static/images/nxg-logo.png";
import Logo from "../../static/images/splash.png";
import Navbar from "./Navbar";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(false);
  };

  const navbarVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  };

  return (
    <nav className="sticky top-0 z-50 bg-secondary px-3">
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10 md:w-14" src={Logo} alt="" />
          <div className="flex flex-col text-white -space-y-1.5">
            <span className="font-bold text-2xl md:text-3xl">NXG</span>
            <span className="text-xs md:text-sm leading-relaxed ">JOB HUB</span>
          </div>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden ml-auto md:flex gap-4">
          <Navbar />
          <div className="flex items-center gap-4">
            <NavLink
              to="/login"
              className="px-3 py-2 rounded-md hover:bg-white transition text-sm font-medium border border-primary text-white hover:border-transparent hover:text-primary"
            >
              Log In
            </NavLink>
            <NavLink
              to="/register"
              className="px-3 py-2 rounded-md bg-primary hover:bg-white transition text-sm font-medium border border-primary text-white hover:border-transparent hover:text-primary"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
        {/* Mobile Menu Button */}
        <Button
          className="md:hidden p-2 bg-primary border-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </Button>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={navbarVariants}
          className="md:hidden w-full min-h-screen flex flex-col absolute top-0 left-0 bg-white px-4 py-4 space-y-2 border-t border-slate-700"
        >
          <Button
            className="ml-auto md:hidden p-2 bg-primary border-transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </Button>
          <div className="flex flex-col text-secondary gap-4">
            <NavLink
              onClick={handleMenuClick}
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-slate-700 text-sm font-medium"
            >
              Home
            </NavLink>
            <NavLink
              onClick={handleMenuClick}
              to="/services"
              className="block px-3 py-2 rounded-md hover:bg-slate-700 text-sm font-medium"
            >
              Services
            </NavLink>
            <NavLink
              onClick={handleMenuClick}
              to="/about"
              className="block px-3 py-2 rounded-md hover:bg-slate-700 text-sm font-medium"
            >
              About
            </NavLink>
            <NavLink
              onClick={handleMenuClick}
              to="/contact"
              className="block px-3 py-2 rounded-md hover:bg-slate-700 text-sm font-medium"
            >
              Contact Us
            </NavLink>
            <NavLink
              onClick={handleMenuClick}
              to="/post-job-form"
              className="block px-3 py-2 rounded-md hover:bg-slate-700 text-sm font-medium"
            >
              Post Job
            </NavLink>
          </div>
          <div className="pt-4 px-2 flex flex-col gap-4">
            <NavLink
              onClick={handleMenuClick}
              to="/login"
              className="px-3 py-2 rounded-md hover:bg-white transition text-secondary text-sm font-medium border border-secondary  hover:border-transparent hover:text-primary"
            >
              Log In
            </NavLink>
            <NavLink
              onClick={handleMenuClick}
              to="/register"
              className="px-3 py-2 rounded-md bg-primary hover:bg-white transition text-sm font-medium border border-primary text-white hover:border-transparent hover:text-primary"
            >
              Sign Up
            </NavLink>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Header;
