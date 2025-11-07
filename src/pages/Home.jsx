import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import SplashScreen from "../components/SplashScreen";
import Explore from "../components/hero/Explore";
import JobCards from "../components/hero/JobCards";
import Testimony from "../components/hero/Testimony";
import Footer from "../components/footer/Footer";

const titles = [
  {
    title1: "",
    span: "Connect",
    title: "with Employers, Talents, Service Providers, Artisans and Agents",
  },
  {
    title1: "Enjoy",
    span: "Verified",
    title: "services at your convenience",
  },
  {
    title1: "Hire a",
    span: "Professional",
    title: " Talent with Ease. Enjoy",
  },
];
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
  }, [selectRandomTitle]);

  return !Loaded ? (
    <SplashScreen />
  ) : (
    <div>
      <div className="landing-main relative w-full bg-gradient-to-b from-sky-50 to-white">
        <Header />

        <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32 md:max-h-[700px] flex flex-col md:flex-row items-center gap-10">
          {/* LEFT CONTENT */}
          <div className="w-full md:w-[70%] space-y-6 text-center md:text-left  !mt-[-50px]">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-300 leading-tight">
              {heroTitle.title1}{" "}
              <span className="text-sky-600">{heroTitle.span}</span>{" "}
              {heroTitle.title}
            </h1>

            <p className="text-gray-200 text-lg md:text-3xl">
              Get access and connect with Professionals, Employers, Talents,
              Service Providers, Artisans and Agents — all in just a few clicks.
            </p>

            <div className="flex justify-center md:justify-start">
              <Link
                to="/register"
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-md transition-all duration-300 text-lg">
                Join Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="jobs-btns">
        <Link to={"/register"} className="post-btn">
          Post Jobs
        </Link>
        <Link to="/login" className="find-btn">
          Find Jobs
        </Link>
      </div>
      <Explore />
      <div
        className="jobs-slider"
        style={{ margin: "3rem 0", padding: ".6rem 2rem" }}>
        <JobCards />
      </div>
      <Testimony />
      <Footer />
    </div>
  );
};

export default Home;
