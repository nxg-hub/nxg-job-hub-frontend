import React from "react";
import Header from "../components/header/Header";
import CategoriesOfService from "../components/Services/CategoriesOfService";
import af from "../static/images/additionalFeatures.png";
import sp from "../static/images/securityPrivacy.png";

const Services = () => {
  return (
    <section className="w-full bg-white pb-20">
      <div className="bg-black">
        <Header />
      </div>
      <div className="sm:w-[60%] w-[80%] m-auto text-center my-10 md:my-20 space-y-5">
        <h2 className="sm:text-xl md:text-3xl font-extrabold">Our Services</h2>
        <div className="w-[90%] m-auto">
          <p className="text-sm md:text-[20px] tracking-widest">
            At NXG Job Hub, we offer a range of services designed to simplify
            the job search and hiring process for tech professionals, agents,
            and employers. Explore our core offerings below:
          </p>
        </div>
      </div>
      <div
        className={`bg-ServicesBusiness bg-no-repeat w-full h-[150px] bg-contain bg-center sm:bg-cover sm:h-[300px] md:h-[580px]  `}></div>
      {/* Different categories of services */}
      <CategoriesOfService />

      {/* {Additional features} */}
      <div className="mt-20 w-[80%] md:w-[90%] m-auto ">
        <h2 className="sm:text-xl md:text-3xl font-extrabold ml-[5%]">
          Additional Features
        </h2>
        <div className="md:flex">
          <div className="w-full m-auto mt-5 md:w-[40%]">
            <img src={af} alt="image" />
          </div>
          <article className="w-full m-auto md:w-[40%] mt-5">
            <div className="space-y-5">
              <h2 className="font-extrabold text-sm md:text-[20px]">
                Data-driven
              </h2>
              <p className="text-sm md:text-[20px] tracking-widest">
                Insights Gain valuable insights into job market dynamics,
                candidate profiles, and hiring trends through our analytics
                dashboard. Use this information to make informed decisions and
                optimize your hiring process.
              </p>
            </div>
            <div className="mt-5 text-sm md:text-[20px] tracking-widest space-y-5">
              <p>
                *Market Analytics: Understand trends and demands in the tech job
                market.
              </p>
              <p>
                *Candidate Analytics: Evaluate candidate performance and fit.
              </p>
              <p>
                * Hiring Metrics: Measure the effectiveness of your hiring
                strategies.
              </p>
            </div>
          </article>
        </div>
        <div className="md:flex mt-11">
          <article className="w-full m-auto md:w-[40%] mt-5">
            <div className="space-y-5">
              <h2 className="font-extrabold text-sm md:text-[20px]">
                Security and Privacy
              </h2>
              <p className="text-sm md:text-[20px] tracking-widest">
                We prioritize the security and privacy of our users. Our
                platform employs robust security measures to protect your data
                and ensure that all interactions remain confidential.
              </p>
            </div>
            <div className="mt-5 text-sm md:text-[20px] tracking-widest space-y-5">
              <p>
                *Data Encryption: Safeguard your information with advanced
                encryption.
              </p>
              <p>*Privacy Controls: Manage your data sharing preferences.</p>
              <p>
                *Compliance Standards: Adhere to industry-standard security
                practices.
              </p>
            </div>
          </article>
          <div className="w-full m-auto mt-5 md:w-[40%]">
            <img src={sp} alt="image" />
          </div>
        </div>
      </div>
      <div className="w-[80%] m-auto mt-24 space-y-11">
        <h2 className="sm:text-xl md:text-3xl font-extrabold">
          Get Started with NXG Job Hub
        </h2>
        <p className="text-sm md:text-[20px] tracking-widest">
          Whether you’re a tech professional looking for your next opportunity,
          an agent managing a pool of talent, or an employer seeking the best
          candidates, NXG Job Hub provides the tools and features you need to
          succeed. Join us today and experience a smarter way to connect and
          grow in the tech industry.
        </p>
      </div>
    </section>
  );
};

export default Services;
