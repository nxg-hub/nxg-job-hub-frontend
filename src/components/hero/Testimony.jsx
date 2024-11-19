import React from "react";
import "./sponsor.scss";
import Jona from "../../static/images/testimony5.jpg";
import Janet from "../../static/images/testimonyimg2.png";
import Peter from "../../static/images/testimonyimg1.png";
import { RiDoubleQuotesR } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import "swiper/css/bundle";

const Testimony = () => {
  const Testimonies = [
    {
      id: 1,
      name: "Chris Oghenerhwe",
      img: Jona,
      text: "I'm so grateful for NXG Job Hub! Thanks to their timely job alerts and the guidance I received on crafting a detailed CV, I landed my first job as a web developer. If you're looking to give your career a strong start, I highly recommend this platform.",
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
  ];
  return (
    <div>
      <h4
        style={{
          fontSize: "34px",
          fontWeight: "700",
          marginTop: "3rem",
          textAlign: "center",
          color: "#2596be",
        }}>
        What Job Seekers Say About Us
      </h4>
      <div className="testimony-content">
        <Swiper
          freeMode={true}
          grabCursor={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Autoplay]}
          className="mySwiper">
          {Testimonies.map((testimony) => {
            return (
              <SwiperSlide key={testimony.id}>
                <div key={testimony.id} className="testimony-card">
                  {/* <div className="testimony-img">
                                    <img src={testimony.img} alt={testimony.name} />
                                </div> */}
                  <div className="testimony-detail">
                    <h6>{testimony.name}</h6>
                    <p>
                      <RiDoubleQuotesR
                        style={{
                          transform: "scaleX(-1)",
                          width: "1.5rem",
                          height: "1.5rem",
                          color: "#2596be",
                          marginBottom: "-0.3rem",
                        }}
                      />
                      {testimony.text}
                      <RiDoubleQuotesR
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          color: "#2596be",
                          marginLeft: ".5rem",
                          marginBottom: "-0.3rem",
                        }}
                      />
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* {Testimonies.map((testimony) => {
                return (
                    <div key={testimony.id} className="testimony-card">
                        <div className="testimony-img">
                            <img src={testimony.img} alt={testimony.name} />
                        </div>
                        <div className="testimony-detail">
                            <p>
                                <RiDoubleQuotesR style = {{transform: 'scaleX(-1)', width:"1.5rem", height:"1.5rem", color:"#2596be",marginBottom:"-0.3rem"}} />
                                 {testimony.text} 
                                <RiDoubleQuotesR style={{width:"1.5rem", height:"1.5rem", color:"#2596be", marginLeft:".5rem", marginBottom:"-0.3rem"}}/>
                            </p>
                        </div>
                    </div>
                )
            })} */}
      </div>
    </div>
  );
};

export default Testimony;
