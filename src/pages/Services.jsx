import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiBarChart2, FiShield, FiCheck } from "react-icons/fi";
import Header from "../components/header/Header";
import CategoriesOfService from "../components/Services/CategoriesOfService";
import af from "../static/images/additionalFeatures.png";
import sp from "../static/images/securityPrivacy.png";
import Footer from "../components/footer/Footer";

const Services = () => {
  useEffect(() => {
    //page to scroll to top unmount
    document.documentElement.scrollTop = 0; // For most modern browsers
  }, []);
  return (
    <section className="w-full bg-white font-inter">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-gradient-to-r from-[#0284c7] via-[#0270a8] to-[#0284c7] text-white">
        <div className="sm:w-[70%] w-[85%] mx-auto py-12 md:py-16 text-center space-y-5">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-[#b3e0f2]">
            Our Services
          </p>
          <h2 className="text-2xl md:text-4xl font-bold">
            Services Built for Every Step of Hiring
          </h2>
          <p className="text-sm md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto">
            From building your profile to closing the hire — one platform for
            talent, agents, and employers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/findjob"
              className="px-6 py-2.5 rounded-lg bg-white text-[#0284c7] font-semibold hover:bg-[#f0f9ff] transition-colors w-full sm:w-auto">
              Find Jobs
            </Link>
            <Link
              to="/post-job-form"
              className="px-6 py-2.5 rounded-lg border border-white/70 text-white font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto">
              Post a Job
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <CategoriesOfService />

      {/* Additional Features - Bento grid */}
      <div className="mt-24 w-[90%] md:w-[85%] mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-10">
          Additional Features
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Data-driven Insights */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#0284c7] to-[#0270a8] px-6 py-4 flex items-center gap-3">
              <FiBarChart2 className="w-5 h-5 text-white shrink-0" />
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Data-driven Insights
              </h3>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <img
                src={af}
                alt="Analytics dashboard illustration"
                className="h-40 object-contain self-center"
              />
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-5">
                Gain valuable insights into job market dynamics, candidate
                profiles, and hiring trends through our analytics dashboard.
              </p>

              <ul className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                {[
                  "Market Analytics: Understand trends and demands.",
                  "Candidate Analytics: Evaluate performance and fit.",
                  "Hiring Metrics: Measure the success of recruiting efforts.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-[#f0f9ff] flex items-center justify-center shrink-0 mt-px">
                      <FiCheck className="w-3 h-3 text-[#0284c7]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          {/* Security and Privacy */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#0284c7] to-[#0270a8] px-6 py-4 flex items-center gap-3">
              <FiShield className="w-5 h-5 text-white shrink-0" />
              <h3 className="text-lg md:text-xl font-semibold text-white">
                Security and Privacy
              </h3>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <img
                src={sp}
                alt="Security and privacy illustration"
                className="h-40 object-contain self-center"
              />
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-5">
                We prioritize user security with robust systems ensuring safe
                and confidential interactions.
              </p>

              <ul className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                {[
                  "Data Encryption for strong protection.",
                  "Privacy Controls to manage preferences.",
                  "Industry-standard Compliance Measures.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-[#f0f9ff] flex items-center justify-center shrink-0 mt-px">
                      <FiCheck className="w-3 h-3 text-[#0284c7]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden w-[90%] md:w-[85%] mx-auto my-24">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-12 w-72 h-72 bg-[#0284c7]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative bg-gradient-to-r from-[#0284c7] via-[#0270a8] to-[#0284c7] text-white text-center rounded-3xl px-6 py-12 md:py-16 space-y-5">
          <h2 className="text-2xl md:text-4xl font-bold">
            Get Started with NXG Job Hub
          </h2>
          <p className="text-sm md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto">
            Whether you're a tech professional, agent, or employer, our platform
            provides the tools you need to succeed. Join us today and
            experience a smarter way to connect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 w-full sm:w-auto px-8 py-3 rounded-full bg-white text-[#0284c7] font-semibold hover:bg-[#f0f9ff] transition-all hover:-translate-y-0.5 shadow-lg">
              Create Free Account
            </Link>
            <Link
              to="/findjob"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
