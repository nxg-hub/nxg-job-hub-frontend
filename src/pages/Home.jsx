import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import SplashScreen from "../components/SplashScreen";
import Explore from "../components/hero/Explore";
import JobCards from '../components/hero/JobCards';
import Sponsors from "../components/hero/Sponsors";
import Testimony from "../components/hero/Testimony";
import Footer from "../components/footer/Footer";


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
    const intervalTitle = setInterval(selectRandomTitle, 2000);
    return () => {
      clearInterval(intervalTitle); // Clear the interval on unmount
    };
  }, [selectRandomTitle])

  return !Loaded ? (
    <SplashScreen />
  ) : (
    <div>
      <div className="landing-main" style={{height: "100vh", width:"100%"}}>
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
            <Link to={"/register"} className="join-btn">
              Join Us
            </Link>
          </div>
        </div>
      </div>
      <Explore />
      <div className="jobs-slider" style={{margin:"3rem 0", padding:".6rem 2rem"}}>
          <JobCards />
      </div>
      <div className="alliances"  style={{margin:"3rem 0"}}>
        <h4 style={{fontSize:"34px", fontWeight:"700", margin:"2rem 0", color:"#2596be", textAlign:"center"}}>Our Alliances</h4>
        <Sponsors />
      </div>
      <Testimony />
      <Footer />
    </div>
  );
};

export default Home;
