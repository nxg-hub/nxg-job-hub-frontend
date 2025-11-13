import React from "react";
import TechjobsSlider from "./TechjobsSlider";
import PostImg from "../../static/images/job-post-img.png";
import LandSearchBar from "./LandSearchBar";
import { jobsDetails } from "./Datas";

const Explore = () => {
  return (
    <>
      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <div style={{ margin: "2rem 0" }}></div>
        <div className="land-search"></div>
        <div className="slider">
          <TechjobsSlider />
        </div>
      </div>
      <section className="job-posting-container">
        <div className="job-posting" style={{ margin: "2rem" }}>
          <h3
            className="text-center"
            style={{
              fontSize: "36px",
              fontWeight: "700",
              margin: ".5rem 0",
              color: "#2596be",
            }}>
            Recent Job Postings
          </h3>
          <p className="text-center">
            View and search our vacancies. Attach your CV and apply online
          </p>
        </div>
        <div className="posting-img" style={{ position: "relative" }}>
          <div className="first-rectangle"></div>
          <div className="postImg">
            <img src={PostImg} alt="Team-sitting" />
          </div>
          <div className="second-rectangle"></div>
        </div>
      </section>
    </>
  );
};

export default Explore;
