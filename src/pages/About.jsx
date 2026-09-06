import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiMessageCircle,
  FiHeart,
  FiBarChart2,
  FiShield,
  FiRefreshCw,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import ObjectiveCard from "../components/About/ObjectiveCard";
import groupImg from "../static/images/AboutGroup.png";

const objectives = [
  {
    num: "01",
    icon: FiTarget,
    title: "Efficient Job Matching",
    content:
      "We utilize advanced algorithms and intuitive features to help tech professionals find job opportunities that align with their skills, experience, and career aspirations. Simultaneously, employers can identify and connect with the best candidates quickly and effectively.",
  },
  {
    num: "02",
    icon: FiMessageCircle,
    title: "Streamlined Communication",
    content:
      "Our platform includes robust communication tools that support direct and efficient interactions between tech talent, agents, and employers. This ensures smooth coordination throughout the hiring process, from application to onboarding.",
  },
  {
    num: "03",
    icon: FiHeart,
    title: "Enhanced User Experience",
    content:
      "User-friendly interfaces and intuitive workflows are at the heart of NXG Job Hub. We prioritize usability and accessibility, ensuring a positive and engaging experience for all our users, whether they are job seekers, agents, or employers.",
  },
  {
    num: "04",
    icon: FiBarChart2,
    title: "Data-driven Insights",
    content:
      "With built-in analytics capabilities, NXG Job Hub provides valuable insights into job market trends, candidate profiles, and performance metrics. These insights empower users to make informed decisions and develop strategic plans that enhance their professional trajectories.",
  },
  {
    num: "05",
    icon: FiShield,
    title: "Security and Privacy",
    content:
      "Trust is paramount. NXG Job Hub is committed to protecting user data with robust security measures, ensuring the privacy and confidentiality of all interactions on our platform.",
  },
  {
    num: "06",
    icon: FiRefreshCw,
    title: "Continuous Improvement",
    content:
      "We believe in evolving with our users. By gathering feedback and continuously iterating on our platform, we ensure that NXG Job Hub remains relevant, effective, and aligned with the ever-changing needs of the job market and our users.",
  },
];

const perks = [
  {
    title: "Innovative Matching Algorithms",
    desc: "Find the right job or candidate with ease.",
  },
  {
    title: "Seamless Communication",
    desc: "Stay connected throughout the hiring process.",
  },
  {
    title: "User-centric Design",
    desc: "Enjoy a platform built for usability and engagement.",
  },
  {
    title: "Actionable Insights",
    desc: "Leverage data to make informed decisions.",
  },
  {
    title: "Uncompromised Security",
    desc: "Your information is always protected.",
  },
  {
    title: "Adaptive Platform",
    desc: "Continuous enhancements based on user feedback.",
  },
];

const About = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <section className="bg-white w-full font-inter">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0284c7] via-[#0270a8] to-[#0284c7] text-white">
        <div className="absolute -top-20 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-[#0284c7]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-3xl mx-auto text-center px-6 pt-16 md:pt-24 pb-20 md:pb-28">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Connecting Talent,
            <br />
            <span className="text-[#7dd3fc]">Empowering Hiring.</span>
          </h1>

          <div className="flex items-center justify-center gap-3 mt-6 mb-6">
            <span className="h-px w-10 bg-[#7dd3fc]/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7dd3fc]" />
            <span className="h-px w-10 bg-[#7dd3fc]/60" />
          </div>

          <p className="text-sm md:text-lg text-gray-100/90 leading-relaxed max-w-2xl mx-auto">
            Welcome to NXG Job Hub — the ultimate platform designed to
            revolutionize the job search and hiring process in the tech
            industry, connecting tech talent, agents, and employers in one
            dynamic ecosystem.
          </p>
        </motion.div>
      </div>

      {/* Vision */}
      <div className="mt-24 md:mt-28 w-[90%] md:w-[60%] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-gradient-to-b from-[#f0f9ff] to-white rounded-3xl border border-[#e0f2fe] text-center px-6 md:px-12 py-12">
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-xl font-bold shadow-lg">
            &rdquo;
          </span>

          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-5">
            Our Vision
          </h2>

          <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
            We envision a world where finding the right job or candidate is a
            smooth, efficient, and rewarding experience. NXG Job Hub bridges the
            gap between tech talent and employers, offering tools that support
            meaningful connections and professional growth.
          </p>
        </motion.div>
      </div>

      {/* Key Objectives */}
      <div className="mt-24 w-[90%] md:w-[85%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Key Objectives
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-3 max-w-xl mx-auto">
            Six principles that drive everything we build.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj) => (
            <ObjectiveCard key={obj.num} {...obj} />
          ))}
        </div>
      </div>

      {/* Why Join Us */}
      <div className="mt-24 w-[90%] md:w-[85%] mx-auto pb-24">
        <div className="text-center mb-14 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Why Join Us
          </h2>
          <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Join NXG Job Hub today and experience the future of job searching
            and hiring. Together, let's create connections that matter and
            build careers that inspire.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-14">
          {/* Checklist */}
          <ul className="space-y-4 order-2 lg:order-1">
            {perks.map((perk, i) => (
              <motion.li
                key={perk.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: i * 0.08,
                }}
                className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#bae6fd] transition-all duration-300 p-4 md:p-5">
                <span className="w-8 h-8 rounded-full bg-[#f0f9ff] flex items-center justify-center shrink-0">
                  <FiCheck className="w-4 h-4 text-[#0284c7]" />
                </span>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800 block">
                    {perk.title}
                  </span>
                  {perk.desc}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-1 lg:order-2">
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#e0f2fe] to-[#eff6ff] rounded-3xl rotate-2 pointer-events-none" />
            <img
              src={groupImg}
              alt="Professionals working together"
              className="relative w-full h-[260px] md:h-[400px] object-cover rounded-3xl shadow-xl"
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-20 text-center space-y-6">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#1d7a9c] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#0284c7]/25 transition-all hover:-translate-y-0.5">
            Create Free Account
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs text-gray-400">
            Free to join · No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
