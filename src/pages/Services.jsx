import React, { useEffect } from "react";
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
      {/* Header */}
      <div className="bg-[#215E7D]">
        <Header />
      </div>

      {/* Intro Section */}
      <div className="sm:w-[60%] w-[80%] mx-auto text-center my-12 md:my-20 space-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Our Services
        </h2>

        <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
          At NXG Job Hub, we offer a range of services designed to simplify the
          job search and hiring process for tech professionals, agents, and
          employers. Explore our core offerings below:
        </p>
      </div>

      {/* Hero banner */}
      <div
        className="bg-ServicesBusiness bg-no-repeat bg-center bg-contain sm:bg-cover 
      w-full h-[150px] sm:h-[300px] md:h-[580px]"></div>

      {/* Categories */}
      <CategoriesOfService />

      {/* Additional Features */}
      <div className="mt-20 w-[80%] md:w-[90%] mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 ml-[5%]">
          Additional Features
        </h2>

        <div className="md:flex items-center mt-8 gap-5 md:justify-between">
          <div className="w-full md:w-[40%]">
            <img src={af} alt="Additional features" />
          </div>

          <article className="w-full md:w-[50%] mt-8 md:mt-0 px-3">
            <h3 className="text-lg md:text-2xl font-semibold text-gray-800">
              Data-driven Insights
            </h3>

            <p className="text-gray-600 text-sm md:text-lg leading-relaxed mt-3">
              Gain valuable insights into job market dynamics, candidate
              profiles, and hiring trends through our analytics dashboard.
            </p>

            <ul className="text-gray-700 text-sm md:text-lg leading-relaxed mt-5 space-y-2">
              <li>• Market Analytics: Understand trends and demands.</li>
              <li>• Candidate Analytics: Evaluate performance and fit.</li>
              <li>
                • Hiring Metrics: Measure the success of recruiting efforts.
              </li>
            </ul>
          </article>
        </div>

        {/* Security Section */}
        <div className="md:flex items-center mt-16">
          <article className="w-full md:w-[50%] px-3">
            <h3 className="text-lg md:text-2xl font-semibold text-gray-800">
              Security and Privacy
            </h3>

            <p className="text-gray-600 text-sm md:text-lg leading-relaxed mt-3">
              We prioritize user security with robust systems ensuring safe and
              confidential interactions.
            </p>

            <ul className="text-gray-700 text-sm md:text-lg leading-relaxed mt-5 space-y-2">
              <li>• Data Encryption for strong protection.</li>
              <li>• Privacy Controls to manage preferences.</li>
              <li>• Industry-standard Compliance Measures.</li>
            </ul>
          </article>

          <div className="w-full md:w-[40%] mt-8 md:mt-0">
            <img src={sp} alt="Security and privacy" />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="w-[80%] mx-auto mt-24 space-y-6 pb-20 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Get Started with NXG Job Hub
        </h2>
        <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
          Whether you're a tech professional, agent, or employer, our platform
          provides the tools you need to succeed. Join us today and experience a
          smarter way to connect.
        </p>
      </div>

      <Footer />
    </section>
  );
};

export default Services;
