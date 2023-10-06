import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import SplashScreen from "../components/SplashScreen";
import Explore from "../components/hero/Explore";

const Home = () => {
  const [Loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);
  return !Loaded ? (
    <SplashScreen />
  ) : (
    <div className="landing-main">
      <Header />
      <div className="landing-content">
        <h1 className="land-title">
          <span>Connect</span> with Employers, Tech Talents and Agents
        </h1>
        <p className="land-text">
          Get access and connect with Professionals, Tech talents, and agents in
          just a few clicks.
        </p>
        <div className="land-btns">
          <Link to={"/acctchoice"} className="join-btn">
            Join Us
          </Link>
        </div>
      </div>
      <Explore />
    </div>
  );
};

export default Home;
