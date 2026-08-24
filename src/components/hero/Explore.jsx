import React from "react";
import TechjobsSlider from "./TechjobsSlider";

const Explore = () => {
  return (
    <div style={{ textAlign: "center", margin: "3rem 0" }}>
      <div style={{ margin: "2rem 0" }}></div>
      <div className="land-search"></div>
      <div className="slider">
        <TechjobsSlider />
      </div>
    </div>
  );
};

export default Explore;
