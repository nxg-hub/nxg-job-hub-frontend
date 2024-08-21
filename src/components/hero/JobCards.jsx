import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { chosen } from "./Datas";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_HOST_URL } from "../../utils/api/API_HOST";

const JobCards = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_HOST_URL}/api/job-postings/recent-job-postings`
        );
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);
  return (
    <>
      <div className="job-card-slider">
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode, Pagination]}
            pagination={{ clickable: true }}
            className="mySwiper"
            spaceBetween={70}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 200,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 250,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 150,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 70,
              },
            }}
          >
            {jobs.length > 0 &&
              jobs.map((job) => (
                <SwiperSlide key={job.jobID || job.job_title}>
                  <div className="detail-holder">
                    <div className="price-shadow">
                      <div className="p-shadows"></div>
                      <div className="p-detail">{job.salary}</div>
                    </div>
                    <div className="card-content">
                      <div className="card-location">
                        <MdLocationPin
                          style={{
                            color: "#2596BE",
                            width: "2rem",
                            height: "2rem",
                          }}
                        />
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginLeft: ".6rem",
                          }}
                        >
                          {job.job_location}
                        </p>
                      </div>
                      <div className="card-detail">
                        <h3>{job.job_title}</h3>
                        <div className="card-detail-texts">
                          {job.job_title}
                          <p>{job.job_description}</p>
                        </div>
                        <div className="read" style={{ marginTop: "1rem" }}>
                          <Link
                            to={`/login`}
                            style={{
                              color: "#2596BE",
                              fontSize: "18px",
                              fontWeight: "400",
                            }}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>

      <div className="choose-us-section" style={{ marginTop: "3rem" }}>
        <h3
          style={{
            fontSize: "34px",
            fontWeight: "700",
            margin: "1rem 0",
            color: "#2596BE",
            textAlign: "center",
          }}
        >
          Why Choose Us ?
        </h3>
        <div className="choose-content">
          {chosen.map((data) => (
            <div className="choose-card-div" key={data.group}>
              <div
                className={
                  data.group === "help" ? "help-details" : "choose-details"
                }
              >
                <div className="choose-text">
                  <h4>{data.title}</h4>
                  <div className="title-line"></div>
                  <p>{data.chosentext}</p>
                </div>
                <div className="choose-img">
                  <img
                    src={data.img}
                    alt={data.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobCards;
