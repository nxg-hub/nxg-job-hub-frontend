import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "./slide.scss";
import Analysis from "../../../src/static/icons/Data analysis.png";
import Machine from "../../../src/static/icons/icon _Computer Process_.png";
import Project from "../../../src/static/icons/icon-browser_.png";
import UI from "../../../src/static/icons/ux design.png";
import Cyber from "../../../src/static/icons/Cybersecurity.svg";
import Web from "../../../src/static/icons/web-development.svg";
import Digital from "../../../src/static/icons/Digital.svg";
import Design from "../../../src/static/icons/web-design.svg";
import DevOps from "../../../src/static/icons/DevOps.svg";
import Cloud from "../../../src/static/icons/cloud-computing.svg";

const TechjobsSlider = () => {
  const Jobsspaces = [
    {
      id: "1",
      icon: Analysis,
      jobtitle: "Data Analysis",
      vacancies: "187 Vacancies",
    },
    {
      id: "2",
      icon: Machine,
      jobtitle: "Machine Learning/AI",
      vacancies: "209 Vacancies",
    },
    {
      id: "3",
      icon: Project,
      jobtitle: "Project Management",
      vacancies: "29 Vacancies",
    },
    {
      id: "4",
      icon: UI,
      jobtitle: "UI/UX Design",
      vacancies: "101 Vacancies",
    },
    {
      id: "5",
      icon: Cyber,
      jobtitle: "Cybersecurity",
      vacancies: "308 Vacancies",
    },
    {
      id: "6",
      icon: Web,
      jobtitle: "Web Development",
      vacancies: "111 Vacancies",
    },
    {
      id: "7",
      icon: Digital,
      jobtitle: "Digital Marketing",
      vacancies: "178 Vacancies",
    },
    {
      id: "8",
      icon: Design,
      jobtitle: "Web Design",
      vacancies: "149 Vacancies",
    },
    {
      id: "9",
      icon: DevOps,
      jobtitle: "DevOps",
      vacancies: "115 Vacancies",
    },
    {
      id: "10",
      icon: Cloud,
      jobtitle: "Cloud Computing",
      vacancies: "71 Vacancies",
    },
  ];
  return (
    <div className="swipe-container">
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode, Pagination]}
        pagination={{ clickable: true }}
        className="mySwiper"
        breakpoints={{
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 60,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 70,
          },
        }}
      >
        {Jobsspaces.map((job) => {
          return (
            <SwiperSlide key={job.id} className="jobspace-main">
              <div className="holder">
                <div className="circle"></div>
                <div className="jobspace-content">
                  <div className="job-icon">
                    <img src={job.icon} alt={job.jobtitle} />
                  </div>
                  <div className="space-details">
                    <h3>{job.jobtitle}</h3>
                    <p>{job.vacancies}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TechjobsSlider;
