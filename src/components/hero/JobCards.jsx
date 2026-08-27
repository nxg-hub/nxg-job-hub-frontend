import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { chosen } from "./Datas";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import JobsCardSkeleton from "../ui/JobsCardSkeleton";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
};

const JobCard = ({ job }) => (
  <div className="bg-white shadow-lg hover:shadow-xl transition-all rounded-2xl overflow-hidden h-full flex flex-col">
    <div className="p-5 sm:p-6 flex-1 flex flex-col">
      <span className="inline-flex items-center gap-1 self-start bg-sky-50 text-sky-600 text-xs sm:text-sm font-semibold capitalize px-2.5 py-1 rounded-full mb-3">
        <MdLocationPin className="w-4 h-4" />
        {job.job_location}
      </span>

      <h3 className="text-lg sm:text-xl font-bold mb-2 capitalize line-clamp-2">
        {job.job_title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {job?.job_description || ""}
      </p>
    </div>

    <div className="mt-auto px-5 sm:px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/60">
      <span className="text-sky-700 font-semibold text-base sm:text-lg truncate mr-3">
        {formatCurrency(job.salary) || "Negotiable"}
      </span>
      <Link
        to="/login"
        className="text-sky-600 text-sm font-medium whitespace-nowrap hover:underline shrink-0">
        Read More →
      </Link>
    </div>
  </div>
);

const swiperBreakpoints = {
  0: { slidesPerView: 1.05, spaceBetween: 16 },
  480: { slidesPerView: 1.2, spaceBetween: 20 },
  640: { slidesPerView: 2, spaceBetween: 24 },
  1024: { slidesPerView: 3, spaceBetween: 40 },
};

const JobCards = () => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_HOST_URL}/api/job-postings/recent-job-postings?page=0&size=5`
        );
        const data = await response.json();

        const acceptedRecentJobs = data?.filter((job) => {
          return (
            job.jobStatus === "ACCEPTED" &&
            job.job_location?.toLowerCase() !== "abuja"
          );
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

  useEffect(() => {
    const fetchAllJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_HOST_URL}/api/job-postings/all?page=0&size=6&sort=string`
        );
        const data = await response.json();
        const acceptedRecentJobs = data?.content?.filter((job) => {
          return (
            job.jobStatus === "ACCEPTED" &&
            job.job_location?.toLowerCase() !== "abuja"
          );
        });
        setAllJobs(acceptedRecentJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllJobs();
  }, []);
  return (
    <div className="w-full flex flex-col items-center px-4 md:px-10 lg:px-20 py-10">
      {/* Job Section */}
      <section className="w-full mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-8">
          Latest Job Openings
        </h2>

        {isLoading ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <JobsCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : jobs.length === 0 ? (
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode, Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            slidesPerView={3}
            breakpoints={swiperBreakpoints}
            className="!py-8">
            {allJobs?.map((job) => (
              <SwiperSlide
                key={job?.jobID || job?.job_title}
                className="h-auto">
                <JobCard job={job} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode, Pagination]}
            pagination={{ clickable: true, dynamicBullets: true }}
            slidesPerView={3}
            breakpoints={swiperBreakpoints}
            className="!py-8">
            {jobs?.map((job) => (
              <SwiperSlide
                key={job?.jobID || job?.job_title}
                className="h-auto">
                <JobCard job={job} />
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
