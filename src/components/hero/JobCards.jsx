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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_HOST_URL}/api/job-postings/recent-job-postings`
        );
        const data = await response.json();
        const acceptedRecentJobs = data.filter((job) => {
          return job.jobStatus === "ACCEPTED";
        });
        setJobs(acceptedRecentJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-4 md:px-10 lg:px-20 py-10">
      {/* Job Section */}
      <section className="w-full mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-8">
          Latest Job Openings
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-400">No jobs available.</p>
        ) : (
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode, Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={40}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-8">
            {jobs.map((job) => (
              <SwiperSlide key={job?.jobID || job?.job_title}>
                <div className="bg-white shadow-lg hover:shadow-xl transition-all rounded-2xl overflow-hidden p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center text-sky-600 mb-4">
                      <MdLocationPin className="w-6 h-6 mr-2" />
                      <p className="text-lg font-semibold capitalize">
                        {job.job_location}
                      </p>
                    </div>

                    <h3 className="text-xl font-bold mb-2 capitalize">
                      {job.job_title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {job?.job_description
                        ? job.job_description.slice(0, 180)
                        : ""}
                      ...
                    </p>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-sky-700 font-semibold text-lg">
                      {formatCurrency(job.salary) || "Negotiable"}
                    </span>
                    <Link
                      to="/login"
                      className="text-sky-600 text-sm font-medium hover:underline">
                      Read More →
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full !mt-[100px]">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-10">
          Why Choose Us?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {chosen.map((data) => (
            <div
              key={data.group}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 transition-all flex flex-col justify-between">
              <div className="flex-1">
                <h4 className="text-xl font-semibold mb-2 text-sky-700">
                  {data.title}
                </h4>
                <div className="w-12 h-1 bg-sky-500 rounded mb-4"></div>
                <p className="text-gray-600 leading-relaxed">
                  {data.chosentext}
                </p>
              </div>

              <div className="mt-6">
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-full h-40 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobCards;
