import React, { useEffect } from "react";
import Header from "../components/header/Header";
import ObjectiveCard from "../components/About/ObjectiveCard";
import Footer from "../components/footer/Footer";

const About = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <section className="bg-white w-full font-inter">
      {/* Header */}
      <div className="bg-black">
        <Header />
      </div>

      {/* Intro Section */}
      <div className="sm:w-[60%] w-[80%] mx-auto text-center my-12 md:my-20 space-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          About Us
        </h2>

        <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
          Welcome to NXG Job Hub, the ultimate online platform designed to
          revolutionize the job search and hiring process in the tech industry.
          Our mission is to create a dynamic ecosystem that connects tech
          talent, agents, and employers — empowering seamless interactions and
          efficient job matching.
        </p>
      </div>

      {/* Banner */}
      <div
        className="bg-AboutCoWorkers bg-no-repeat bg-center bg-contain sm:bg-cover 
        w-full h-[150px] sm:h-[300px] md:h-[580px]"
      />

      {/* Vision Section */}
      <div className="w-[85%] sm:w-[55%] mx-auto bg-[#215E7D] mt-12 md:mt-20 rounded-3xl text-center text-white py-10 px-6">
        <h2 className="text-2xl md:text-4xl font-bold">Our Vision</h2>

        <p className="mt-6 text-sm md:text-lg leading-relaxed text-gray-100">
          We envision a world where finding the right job or candidate is a
          smooth, efficient, and rewarding experience. NXG Job Hub bridges the
          gap between tech talent and employers, offering tools that support
          meaningful connections and professional growth.
        </p>
      </div>

      {/* Key Objectives */}
      <div className="w-[90%] mx-auto mt-20">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12">
          Key Objectives
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ObjectiveCard
            num="01"
            title="Efficient Job Matching"
            content="We utilize advanced algorithms and intuitive features to help tech professionals find job opportunities that align with their skills, experience, and career aspirations. Simultaneously, employers can identify and connect with the best candidates quickly and effectively."
          />
          <ObjectiveCard
            num="02"
            title="Streamlined Communication"
            content="Our platform includes robust communication tools that support direct and efficient interactions between tech talent, agents, and employers. This ensures smooth coordination throughout the hiring process, from application to onboarding."
          />
          <ObjectiveCard
            num="03"
            title="Enhanced User Experience"
            content="User-friendly interfaces and intuitive workflows are at the heart of NXG Job Hub. We prioritize usability and accessibility, ensuring a positive and engaging experience for all our users, whether they are job seekers, agents, or employers."
          />
          <ObjectiveCard
            num="04"
            title="Data-driven Insights"
            content="With built-in analytics capabilities, NXG Job Hub provides valuable insights into job market trends, candidate profiles, and performance metrics. These insights empower users to make informed decisions and develop strategic plans that enhance their professional trajectories."
          />
          <ObjectiveCard
            num="05"
            title="Security and Privacy"
            content="Trust is paramount. NXG Job Hub is committed to protecting user data with robust security measures, ensuring the privacy and confidentiality of all interactions on our platform."
          />
          <ObjectiveCard
            num="06"
            title="Continuous Improvement"
            content="We believe in evolving with our users. By gathering feedback and continuously iterating on our platform, we ensure that NXG Job Hub remains relevant, effective, and aligned with the ever-changing needs of the job market and our users."
          />
        </div>
      </div>

      {/* Why Join Us */}
      <div className="mt-20">
        <article className="w-[80%] md:w-[55%] mx-auto space-y-6 text-center ">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            Why Join Us
          </h2>

          <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
            Join NXG Job Hub today and experience the future of job searching
            and hiring. Together, let's create connections that matter and build
            careers that inspire.
          </p>
        </article>

        <div className="mt-14 md:flex w-[90%] mx-auto pb-20 items-start gap-10">
          {/* Image */}
          <div
            className="bg-AboutGroup bg-contain bg-no-repeat w-full h-[200px] 
            md:w-[50%] md:h-[300px] mb-6 md:mb-0"
          />

          {/* List */}
          <article className="w-full md:w-[50%] space-y-4 text-gray-700">
            {[
              "*Innovative Matching Algorithms: Find the right job or candidate with ease.",
              "*Seamless Communication: Stay connected throughout the hiring process.",
              "*User-centric Design: Enjoy a platform built for usability and engagement.",
              "*Actionable Insights: Leverage data to make informed decisions.",
              "*Uncompromised Security: Your information is always protected.",
              "*Adaptive Platform: Continuous enhancements based on user feedback.",
            ].map((item, index) => (
              <p
                key={index}
                className="text-sm md:text-lg leading-relaxed md:text-right">
                <span className="font-semibold">{item.split(":")[0]}:</span>{" "}
                {item.split(":")[1]}
              </p>
            ))}
          </article>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default About;
