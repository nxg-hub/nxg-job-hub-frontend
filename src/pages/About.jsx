import React, { useEffect } from "react";
import Header from "../components/header/Header";
import ObjectiveCard from "../components/About/ObjectiveCard";
import Footer from "../components/footer/Footer";

const About = () => {
  useEffect(() => {
    //page to scroll to top unmount
    document.documentElement.scrollTop = 0; // For most modern browsers
  }, []);
  return (
    <section className="bg-white w-full scroll-smooth">
      <div className="bg-black">
        <Header />
      </div>
      <div className="sm:w-[60%] w-[80%] m-auto text-center my-10 space-y-5 md:my-20">
        <h2 className="sm:text-xl md:text-3xl font-extrabold">About Us</h2>
        <div className="w-[90%] m-auto">
          <p className="text-sm md:text-[20px] tracking-widest">
            Welcome to NXG Job Hub, the ultimate online platform designed to
            revolutionize the job search and hiring process in the tech
            industry. At NXG Job Hub, our mission is to create a dynamic
            ecosystem that connects tech talent, agents, and employers,
            fostering seamless interactions and efficient job matching. Our
            platform is crafted with a vision to streamline the hiring process,
            enhance user experience, and empower our users with data-driven
            insights.
          </p>
        </div>
      </div>
      <div
        className={`bg-AboutCoWorkers bg-no-repeat w-full h-[150px] bg-contain bg-center sm:bg-cover sm:h-[300px] md:h-[580px]  `}></div>
      {/* our vision section */}
      <div className=" w-[80%] sm:w-[50%] bg-[#215E7D] m-auto h-[320px] sm:h-[280px] mt-10 md:mt-20 rounded-3xl text-center text-white py-8">
        <h2 className="sm:text-xl md:text-3xl font-extrabold">Our Vision</h2>
        <div className="w-[90%] m-auto mt-7 text-justify">
          <p className="text-sm md:text-[20px] tracking-wide sm:tracking-widest ">
            At NXG Job Hub, we envision a world where finding the right job and
            hiring the perfect candidate is a smooth, efficient, and rewarding
            experience. Our platform aims to bridge the gap between tech talent
            and employers, providing tools and features that facilitate
            meaningful connections and foster professional growth.
          </p>
        </div>
      </div>

      {/* key objective */}
      <div className="w-[90%] m-auto">
        <h2 className="sm:text-xl md:text-3xl font-extrabold my-10">
          Key Objectives
        </h2>
        <div className="grid md:grid-cols-3 gap-6 ">
          <ObjectiveCard
            num="01"
            title="Efficient Job Matching:"
            content="We utilize advanced algorithms and intuitive features to help tech professionals find job opportunities that align with their skills, experience, and career aspirations. Simultaneously, employers can identify and connect with the best candidates quickly and effectively."
          />
          <ObjectiveCard
            num="02"
            title="Streamlined Communication:"
            content="Our platform includes robust communication tools that support direct and efficient interactions between tech talent, agents, and employers. This ensures smooth coordination throughout the hiring process, from application to onboarding."
          />
          <ObjectiveCard
            num="03"
            title="Enhanced User Experience:"
            content="User-friendly interfaces and intuitive workflows are at the heart of NXG Job Hub. We prioritize usability and accessibility, ensuring a positive and engaging experience for all our users, whether they are job seekers, agents, or employers."
          />
          <ObjectiveCard
            num="04"
            title="Data-driven Insights:"
            content="With built-in analytics capabilities, NXG Job Hub provides valuable insights into job market trends, candidate profiles, and performance metrics. These insights empower users to make informed decisions and develop strategic plans that enhance their professional trajectories."
          />
          <ObjectiveCard
            num="05"
            title="Security and Privacy:"
            content="Trust is paramount. NXG Job Hub is committed to protecting user data with robust security measures, ensuring the privacy and confidentiality of all interactions on our platform."
          />
          <ObjectiveCard
            num="06"
            title="Continuous Improvement:"
            content="We believe in evolving with our users. By gathering feedback and continuously iterating on our platform, we ensure that NXG Job Hub remains relevant, effective, and aligned with the ever-changing needs of the job market and our users."
          />
        </div>
      </div>

      {/* why join us */}
      <div className="mt-11">
        <article className="w-[80%] m-auto md:w-[50%] md:ml-[5%] space-y-9">
          <h2 className="sm:text-xl md:text-3xl font-extrabold">Why Join Us</h2>
          <p className="text-sm md:text-[20px] tracking-widest">
            Join NXG Job Hub today and experience the future of job searching
            and hiring in the tech industry. Together, we can create connections
            that matter and build careers that inspire.
          </p>
        </article>
        <div className="mt-11 md:flex w-[90%] m-auto pb-20">
          <div className="bg-AboutGroup bg-contain w-[100%] m-auto h-[200px] mb-4 bg-no-repeat md:w-[50%] md:h-[300px]"></div>
          <article className="w-[100%] m-auto space-y-3 md:w-[50%] tracking-widest">
            <h2 className="text-sm md:text-[20px] md:text-right">
              <span className="font-bold">
                *Innovative Matching Algorithms:
              </span>
              Find the right job or candidate with ease.
            </h2>
            <h2 className="text-sm md:text-[20px] md:text-right">
              <span className="font-bold">*Seamless Communication:</span>
              Stay connected throughout the hiring process.
            </h2>
            <h2 className="text-sm md:text-[20px] md:text-right">
              <span className="font-bold">*User-centric Design: </span>
              Enjoy a platform built for usability and engagement.
            </h2>
            <h2 className="text-sm md:text-[20px] md:text-right">
              <span className="font-bold">*Actionable Insights: </span>
              Leverage data to make informed decisions.
            </h2>
            <h2 className="text-sm md:text-[20px] md:text-right">
              <span className="font-bold">*Uncompromised Security: </span>
              Trust that your data is protected at all times.
            </h2>
            <h2 className="text-sm md:text-[20px] md:text-right">
              <span className="font-bold">*Adaptive Platform: </span>
              Benefit from continuous enhancements based on user feedback.
            </h2>
          </article>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default About;
