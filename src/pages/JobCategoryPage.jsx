// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { API_HOST_URL } from "@/utils/api/API_HOST";

// const JobCategoryPage = () => {
//   const { category } = useParams();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const formatted = category.replace(/-/g, " "); // convert URL → readable text

//   useEffect(() => {
//     const fetchJobs = async () => {
//       setLoading(true);

//       // 1️⃣ Fetch jobs for the category
//       const res = await fetch(
//         `${API_HOST_URL}/api/job-postings/search-job-by-category?keyword=${formatted}`
//       );
//       const data = await res.json();

//       if (data?.length > 0) {
//         // jobs found → display them
//         setJobs(data);
//       } else {
//         // 2️⃣ Fallback → fetch all jobs
//         const resAll = await fetch(`${API_HOST_URL}/api/job-postings/all`);
//         const allJobs = await resAll.json();
//         setJobs(allJobs);
//       }

//       setLoading(false);
//     };

//     fetchJobs();
//   }, [formatted]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold capitalize mb-4">{formatted} Jobs</h1>

//       {loading && <p>Loading jobs...</p>}

//       {!loading && jobs.length === 0 && (
//         <p className="text-gray-500">No jobs found.</p>
//       )}

//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {jobs.map((job) => (
//           <div key={job.id} className="shadow p-4 rounded-lg">
//             <h3 className="font-bold">{job.title}</h3>
//             <p className="text-gray-500">{job.company}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobCategoryPage;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
import { LuClock } from "react-icons/lu";
import avatar from "../static/images/user.png";
import Logo from "../static/images/splash.png";
import Footer from "../components/footer/Footer";
import { API_HOST_URL } from "@/utils/api/API_HOST";
import ReactPaginate from "react-paginate";
import JobsCardSkeleton from "@/components/ui/JobsCardSkeleton";

const JobCategoryPage = () => {
  const { category } = useParams();
  const readableCategory = category.replace(/-/g, " ");

  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      try {
        const keywords = readableCategory.split(" ");

        let combinedResults = [];

        // Fetch results for each individual keyword
        for (const word of keywords) {
          const res = await fetch(
            `${API_HOST_URL}/api/job-postings/search-job-by-category?keyword=${word}`
          );
          const data = await res.json();

          combinedResults.push(...data);
        }

        // Filter accepted only
        combinedResults = combinedResults.filter(
          (job) => job.jobStatus === "ACCEPTED"
        );

        // Remove duplicates by job ID
        const uniqueJobs = Array.from(
          new Map(combinedResults.map((job) => [job.id, job])).values()
        );

        if (uniqueJobs.length === 0) {
          // Fallback to all jobs
          const resAll = await fetch(`${API_HOST_URL}/api/job-postings/all`);
          const all = await resAll.json();

          const acceptedAll = all.filter((job) => job.jobStatus === "ACCEPTED");

          setJobs(acceptedAll);
          setFiltered(acceptedAll);
        } else {
          setJobs(uniqueJobs);
          setFiltered(uniqueJobs);
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [readableCategory]);

  // 🔍 Search filtering
  useEffect(() => {
    const filteredData = jobs.filter((job) =>
      job.job_title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [searchTerm, jobs]);

  // Pagination logic
  const lastIndex = currentPage * jobsPerPage;
  const currentJobs = filtered.slice(lastIndex - jobsPerPage, lastIndex);

  const paginate = ({ selected }) => setCurrentPage(selected + 1);

  return (
    <div className="min-h-screen bg-gray-50 font-inter w-full">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-secondary shadow-sm flex items-center justify-between px-6 py-4 w-full">
        <Link to="/" className="w-36">
          <img src={Logo} alt="Logo" className="w-[50px] h-[50px]" />
        </Link>

        <div className="relative w-80">
          <IoSearchOutline className="absolute left-3 top-3.5 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder={`Search within ${readableCategory}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </header>

      {/* Page Title */}
      <div className="px-6 pt-6">
        <h2 className="text-2xl font-bold text-sky-700 capitalize">
          {readableCategory} Jobs
        </h2>
        <p className="text-gray-500 mt-1">
          Showing results for:{" "}
          <span className="font-medium">{readableCategory}</span>
        </p>
      </div>

      {/* Content */}
      <main className="px-6 py-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobsCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs found for{" "}
            <span className="font-medium">"{searchTerm}"</span>
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentJobs.map((job) => (
                <div
                  key={job.jobID}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-5 flex flex-col justify-between">
                  {/* Employer Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={job.employer_profile_pic || avatar}
                      alt={job.employer_name}
                      className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {job.employer_name}
                      </h4>
                      <p className="text-sm text-gray-500">Employer</p>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.job_title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {job.job_description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-sky-700" />
                        {job.job_location || "Not specified"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MdWorkOutline className="text-sky-700" />
                        {job.job_type || "Full-time"}
                      </span>
                      <span className="flex items-center gap-1">
                        <LuClock className="text-sky-700" />
                        {new Date(job.deadline).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sky-700 font-semibold text-lg">
                      ₦{job.salary}
                    </span>
                    <Link
                      to="/login"
                      className="bg-sky-700 text-white text-sm px-4 py-2 rounded-md transition-all">
                      Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <ReactPaginate
              onPageChange={paginate}
              pageCount={Math.ceil(filtered.length / jobsPerPage)}
              previousLabel={"Prev"}
              nextLabel={"Next"}
              containerClassName={
                "flex justify-center gap-2 mt-8 text-sm font-medium"
              }
              pageLinkClassName={
                "px-3 py-1 bg-gray-200 rounded-md hover:bg-sky-600 hover:text-white transition"
              }
              activeLinkClassName={"bg-sky-700 text-white"}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default JobCategoryPage;
