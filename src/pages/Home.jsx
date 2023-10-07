import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import SplashScreen from "../components/SplashScreen";
import Explore from "../components/hero/Explore";


const titles = [
    {
      title1:"",
      span: "Connect",
      title: "with Employers, Tech Talents and Agents"
    },
    {
      title1:"Enjoy",
      span: "Verified",
      title: "services at your convenience"
    },
    {
      title1:"Hire a",
      span: "Professional",
      title: "Tech Talent with Ease. Enjoy"
    },
]
const Home = () => {
  const [Loaded, setLoaded] = useState(false);
  const [heroTitle, setHeroTitle] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  const selectRandomTitle = useCallback(() => {
    const titleIndex = Math.floor(Math.random() * titles.length);
    setHeroTitle(titles[titleIndex]);
  }, []);

  useEffect(() => {
    const intervalTitle = setInterval(selectRandomTitle, 2500);
    return () => {
      clearInterval(intervalTitle); // Clear the interval on unmount
    };
  }, [selectRandomTitle])

  return !Loaded ? (
    <SplashScreen />
  ) : (
    <div className="landing-main">
      <Header />
      <div className="landing-content">
        <h1 className="land-title">
          {heroTitle.title1} {""}
           <span>{heroTitle.span}</span> {""}
          {heroTitle.title}
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
