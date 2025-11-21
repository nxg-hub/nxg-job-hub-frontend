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
        className="landing-main"
        style={{
          height: "auto",
          width: "100%",
          padding: "2rem 1rem 3rem 1rem",
        }}>
        <Header />
        {/* <div className="landing-content !w-auto md:!w-[60%] !pt-36 md:!p-4 md:mt-[10px]">
          <h1 className="text-3xl md:text-6xl font-bold  leading-tight pt-[100px]">
            <span
              className={`${heroTitle.title1 ? "" : "ml-[-2%] md:ml-[-1%]"}`}>
              {heroTitle.title1}
            </span>
            <span className="text-[#2596BE] px-2">{heroTitle.span}</span>
            {heroTitle.title}
          </h1>
          <p className="land-tex text-lg md:text-3xl mt-4 font-inter">
            Get access and connect with Professionals, Employers, Talents,
            Service Providers, Artisans and Agents — all in just a few clicks.
          </p>
          <div className="flex max-w-[700px] mt-[150px] py-3">
            <Link
              to={"/register"}
              className="bg-[#2596BE] text-white  px-4 py-4 text-center  w-[50%] ">
              Post Jobs
            </Link>
            <Link
              to="/findjob"
              className="bg-transparent text-whitepx-4 py-4 text-center w-[50%] border border-[#2596BE]">
              Find Jobs
            </Link>
          </div>
        </div> */}
        <div className="landing-content !w-auto md:!w-[60%] !pt-36 md:!p-4 md:mt-[10px] relative">
          <h1 className="text-3xl md:text-6xl font-bold leading-tight md:pt-[100px]">
            <span
              className={`${heroTitle.title1 ? "" : "ml-[-2%] md:ml-[-1%]"}`}>
              {heroTitle.title1}
            </span>
            <span className="text-[#2596BE] px-2">{heroTitle.span}</span>
            {heroTitle.title}
          </h1>

          <p className="land-tex text-lg md:text-3xl mt-4 font-inter">
            Get access and connect with Professionals, Employers, Talents,
            Service Providers, Artisans and Agents — all in just a few clicks.
          </p>
          <div className="flex max-w-[800px] absolute bottom-[-70px] md:bottom-[-130px] left-0 w-full mt-[150px] py-3">
            <Link
              to="/register"
              onMouseEnter={() => setHovered("post")}
              onMouseLeave={() => setHovered(null)}
              className={`w-[50%] px-4 py-4 text-center border transition-colors duration-300 ${
                hovered === "find"
                  ? "bg-[#2596BE] text-white"
                  : hovered === "post"
                  ? "bg-transparent text-[#2596BE]"
                  : "bg-[#2596BE] text-white"
              } border-[#2596BE}`}>
              Post Jobs{" "}
            </Link>

            <Link
              to="/findjob"
              onMouseEnter={() => setHovered("find")}
              onMouseLeave={() => setHovered(null)}
              className={`w-[50%] px-4 py-4 text-center border transition-colors duration-300 ${
                hovered === "post"
                  ? "bg-[#2596BE] text-white"
                  : hovered === "find"
                  ? "bg-transparent text-[#2596BE]"
                  : "bg-transparent text-[#2596BE]"
              } border-[#2596BE}`}>
              Find Jobs
            </Link>
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
      <Footer />
    </div>
  );
};

export default Home;
