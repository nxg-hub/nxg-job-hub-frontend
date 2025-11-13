import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import Analysis from "../../../src/static/icons/data_analysis.png";
import Machine from "../../../src/static/icons/icon_Computer_Process_.png";
import Project from "../../../src/static/icons/icon-browser_.png";
import UI from "../../../src/static/icons/ux_design.png";
import Cyber from "../../../src/static/icons/Cybersecurity.svg";
import Web from "../../../src/static/icons/web-development.svg";
import Digital from "../../../src/static/icons/Digital.svg";
import Design from "../../../src/static/icons/web-design.svg";
import DevOps from "../../../src/static/icons/DevOps.svg";
import Cloud from "../../../src/static/icons/cloud-computing.svg";
import { useNavigate } from "react-router-dom";

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
    { id: "4", icon: UI, jobtitle: "UI/UX Design", vacancies: "101 Vacancies" },
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
    { id: "9", icon: DevOps, jobtitle: "DevOps", vacancies: "115 Vacancies" },
    {
      id: "10",
      icon: Cloud,
      jobtitle: "Cloud Computing",
      vacancies: "71 Vacancies",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="w-full px-6 md:px-10 lg:px-20 py-10 bg-gradient-to-b from-white via-sky-50 to-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-10">
        Explore Job Categories
      </h2>
      <Swiper
        freeMode
        grabCursor
        modules={[FreeMode, Pagination]}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        spaceBetween={40}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1.3, spaceBetween: 20 },
          640: { slidesPerView: 2.3, spaceBetween: 30 },
          1024: { slidesPerView: 3.5, spaceBetween: 40 },
          1280: { slidesPerView: 4.5, spaceBetween: 50 },
        }}
        className="pb-12">
        {Jobsspaces.map((job) => (
          <SwiperSlide key={job.id}>
            <div
              onClick={() => {
                navigate("/findjob");
              }}
              className="flex flex-col items-center text-center bg-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1 hover:scale-105 rounded-2xl p-6 cursor-pointer h-60 justify-center">
              <div className="w-20 h-20 mb-4 bg-gradient-to-tr from-sky-100 to-sky-200 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={job.icon}
                  alt={job.jobtitle}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {job.jobtitle}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{job.vacancies}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Pagination Dots Below */}
      <div className="swiper-pagination-custom mt-8 flex justify-center"></div>
    </div>
  );
};

export default TechjobsSlider;
