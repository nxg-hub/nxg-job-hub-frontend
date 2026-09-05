import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  const [titleIndex, setTitleIndex] = useState(0);
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 2000);
  }, []);

  const heroTitle = titles[titleIndex];

  useEffect(() => {
    const intervalTitle = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000);
    return () => {
      clearInterval(intervalTitle); // Clear the interval on unmount
    };
  }, []);

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
            <AnimatePresence mode="wait">
              <motion.h1
                key={titleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
                {heroTitle.title1 && <span>{heroTitle.title1} </span>}
                <span className="text-[#0284c7]">{heroTitle.span} </span>
                <span>{heroTitle.title}</span>
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="mt-6 text-lg md:text-xl text-gray-200 font-medium leading-relaxed">
              Get access and connect with Professionals, Employers, Talents,
              Service Providers, Artisans and Agents — all in just a few clicks.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="mt-10 flex w-full max-w-md ">
              <Link
                to="/register"
                onMouseEnter={() => setHovered("post")}
                onMouseLeave={() => setHovered(null)}
                className={`w-1/2 py-4 text-center font-semibold transition-all rounded-l-md duration-300 ${
                  hovered === "post"
                    ? "bg-[#0284c7] text-white"
                    : hovered === "find"
                    ? "bg-transparent text-[#0284c7]"
                    : "bg-[#0284c7] text-white"
                } border border-[#0284c7]`}>
                Post Jobs
              </Link>

              <Link
                to="/findjob"
                onMouseEnter={() => setHovered("find")}
                onMouseLeave={() => setHovered(null)}
                className={`w-1/2 py-4 text-center font-semibold transition-all duration-300 rounded-r-md ${
                  hovered === "find"
                    ? "bg-[#0284c7] text-white"
                    : hovered === "post"
                    ? "bg-transparent text-[#0284c7]"
                    : "bg-transparent text-[#0284c7]"
                } border border-l-0 border-[#0284c7]`}>
                Find Jobs
              </Link>
            </motion.div>
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
