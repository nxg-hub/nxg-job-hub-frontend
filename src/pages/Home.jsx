import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import Explore from "../components/hero/Explore";
import JobCards from "../components/hero/JobCards";
import Testimony from "../components/hero/Testimony";
import bg from "../static/images/Team-working-together.webp";

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
  const [hovered, setHovered] = useState(null);
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
      <div
        className="relative min-h-[90vh] w-full bg-cover bg-center flex items-center font-inter"
        style={{
          backgroundImage: `url(${bg})`,
        }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-3xl">
            {/* Headline */}
            <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
              {heroTitle.title1 && <span>{heroTitle.title1} </span>}
              <span className="text-[#2596BE]">{heroTitle.span} </span>
              <span>{heroTitle.title}</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-lg md:text-xl text-gray-200 font-medium leading-relaxed">
              Get access and connect with Professionals, Employers, Talents,
              Service Providers, Artisans and Agents — all in just a few clicks.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex w-full max-w-md ">
              <Link
                to="/register"
                onMouseEnter={() => setHovered("post")}
                onMouseLeave={() => setHovered(null)}
                className={`w-1/2 py-4 text-center font-semibold transition-all rounded-l-md duration-300 ${
                  hovered === "post"
                    ? "bg-[#2596BE] text-white"
                    : hovered === "find"
                    ? "bg-transparent text-[#2596BE]"
                    : "bg-[#2596BE] text-white"
                } border border-[#2596BE]`}>
                Post Jobs
              </Link>

              <Link
                to="/findjob"
                onMouseEnter={() => setHovered("find")}
                onMouseLeave={() => setHovered(null)}
                className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 rounded-r-md ${
                  hovered === "find"
                    ? "bg-[#2596BE] text-white"
                    : hovered === "post"
                    ? "bg-transparent text-[#2596BE]"
                    : "bg-transparent text-[#2596BE]"
                } border border-l-0 border-[#2596BE]`}>
                Find Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Explore />
      <div
        className="jobs-slider"
        style={{ margin: "3rem 0", padding: ".6rem 2rem" }}>
        <JobCards />
      </div>
      <Testimony />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
