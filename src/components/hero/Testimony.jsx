import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { RiDoubleQuotesR } from "react-icons/ri";
import "swiper/css/bundle";
import Jona from "../../static/images/testimony5.jpg";
import Janet from "../../static/images/testimonyimg2.png";
import Peter from "../../static/images/testimonyimg1.png";

const Testimony = () => {
  const Testimonies = [
    {
      id: 1,
      name: "Chris Oghenerhwe",
      img: Jona,
      text: "I'm so grateful for NXG Job Hub! Thanks to their timely job alerts and guidance on crafting a detailed CV, I landed my first job as a web developer. If you're looking to give your career a strong start, I highly recommend this platform.",
    },
    {
      id: 2,
      name: "Janet Davids",
      img: Janet,
      text: "NXG Job Hub made all the difference in my job search. Their prompt job alerts and support in creating a polished CV helped me secure my first web developer role. This platform is a must if you're serious about advancing your career.",
    },
    {
      id: 3,
      name: "Peter Williams",
      img: Peter,
      text: "Getting my first job as a web developer was a breeze with NXG Job Hub. Their job alerts were always on point, and their advice on my CV was spot on. I highly recommend this platform to anyone looking for a career boost!",
    },
    {
      id: 4,
      name: "Miracle Ogbonna",
      img: Peter,
      text: "Getting my first job as a software engineer was very easy with NXG Job Hub. Their job alerts were always on point,  I highly recommend this platform to anyone looking for a career boost!",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-sky-50 to-white py-16 px-6 md:px-10 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-12">
        What Job Seekers Say About Us
      </h2>

      <Swiper
        freeMode
        grabCursor
        centeredSlides
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        modules={[FreeMode, Autoplay]}
        spaceBetween={40}
        slidesPerView={1.2}
        breakpoints={{
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="pb-10">
        {Testimonies.map((testimony) => (
          <SwiperSlide key={testimony.id}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 p-6 md:p-8 h-full flex flex-col justify-between">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-sky-100 shadow-sm mb-4">
                  {/* <img
                    src={testimony.img}
                    alt={testimony.name}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  {testimony.name}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed relative">
                  <RiDoubleQuotesR className="inline-block text-sky-400 w-5 h-5 transform -scale-x-100 mr-1 align-text-top" />
                  {testimony.text}
                  <RiDoubleQuotesR className="inline-block text-sky-400 w-5 h-5 ml-1 align-text-top" />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimony;
