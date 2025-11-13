import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdWorkOutline } from "react-icons/md";
import { LuClock } from "react-icons/lu";
import avatar from "../../static/images/user.png";
// import Logo from "../../static/images/nxg-logo.png";
import Logo from "../../static/images/splash.png";
import Footer from "../../components/footer/Footer";
import { API_HOST_URL } from "../../utils/api/API_HOST";
import ReactPaginate from "react-paginate";

const FindjobPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobsResult, setJobsResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_HOST_URL}/api/job-postings/all?page=0&size=20&sort=string`
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        console.log(data);
        const acceptedData = data.filter((job) => job.jobStatus === "ACCEPTED");
        setJobsResult(acceptedData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
  // const handleClearSearch = () => setSearchTerm("");

  const filteredJobs = searchTerm
    ? jobsResult.filter((job) =>
        job.job_title.toLowerCase().includes(searchTerm)
      )
    : jobsResult;

  const indexOfLastPost = currentPage * jobsPerPage;
  const currentJobPost = filteredJobs.slice(
    indexOfLastPost - jobsPerPage,
    indexOfLastPost
  );

  const paginate = ({ selected }) => setCurrentPage(selected + 1);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#006a90] shadow-sm flex items-center justify-between px-6 py-4">
        <Link to="/" className="w-36">
          <img src={Logo} alt="Nxg Logo" className="w-[100px] h-[100px]" />
        </Link>

        <div className="relative w-80">
          <IoSearchOutline className="absolute left-3 top-3.5 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search job titles..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-10 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs found for
            <span className="font-medium">"{searchTerm}"</span>
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentJobPost.map((job) => (
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

                    {/* Job Details */}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <HiOutlineLocationMarker className="text-sky-600" />
                        {job.job_location || "Not specified"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MdWorkOutline className="text-sky-600" />
                        {job.job_type || "Full-time"}
                      </span>
                      <span className="flex items-center gap-1">
                        <LuClock className="text-sky-600" />
                        {new Date(job.deadline).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sky-600 font-semibold text-lg">
                      ₦{job.salary}
                    </span>
                    <div className="flex gap-3">
                      <Link
                        to="/login"
                        className="bg-sky-600 hover:bg-sky-700 text-white text-sm px-4 py-2 rounded-md transition-all">
                        Apply
                      </Link>
                      {/* <Link
                        to="/login"
                        className="text-sky-600 text-sm hover:underline">
                        Details
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <ReactPaginate
              onPageChange={paginate}
              pageCount={Math.ceil(filteredJobs.length / jobsPerPage)}
              previousLabel={"Prev"}
              nextLabel={"Next"}
              containerClassName={
                "flex justify-center gap-2 mt-8 text-sm font-medium"
              }
              pageLinkClassName={
                "px-3 py-1 bg-gray-200 rounded-md hover:bg-sky-500 hover:text-white transition"
              }
              activeLinkClassName={"bg-sky-600 text-white"}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FindjobPage;
