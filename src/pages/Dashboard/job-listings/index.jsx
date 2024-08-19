import React, { useState, useEffect } from "react";
import JobCard from "./_components/card";
import CardDetails from "./_components/card-details";
import Successfull from "./_components/successfull";
import "./searchBar.scss";
import { API_HOST_URL } from "../../../utils/api/API_HOST.js";
import ProfileSearch from "../TechTalent/ProfileSearch.jsx";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [successfull, setSuccessfull] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const fetchData = async () => {
    const response = await fetch(`${API_HOST_URL}/api/job-postings/all`);
    const data = await response.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (job) => {
    setSelectedCardId(job.jobId);
    setShowDetails(true);
  };

  useEffect(() => {
    fetchData();
    const checkVerification = async () => {
      const verified = await isUserVerified();
      setIsUserVerified(verified);
    };
    checkVerification();
  }, []);

  const handleApply = async (job) => {
    if (!isUserVerified) {
      alert("Please verify your account to apply for jobs.");
      return;
    }

    const { name, email } = user;
    try {
      const response = await fetch(
        `${API_HOST_URL}/api/job-postings/{jobID}/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        setSuccessfull(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            "An error occurred while submitting your application."
        );
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };
  // const handleApply = () => {
  //   setSuccessfull(true);
  // };

  const handleClose = () => {
    setShowDetails(false);
    setSuccessfull(true);
  };

  //storing the job url to be passed as props to the search component
  const allJobsUrl = `/api/job-postings/all`;
  return (
    <div className="dash-profile-main-side relative">
      <div className="dash-profile-search-section">
        <ProfileSearch url={allJobsUrl} />
      </div>
      {(showDetails || successfull) && (
        <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
      )}
      {showDetails && (
        <div className="fixed lg:absolute z-50 w-full lg:w-1/2 h-full overflow-auto lg:top-[8%] bottom-[0%] lg:left-[25%]">
          <CardDetails
            job={jobs.find((job) => job.jobId === selectedCardId)}
            onClose={handleClose}
          />
        </div>
      )}
      {successfull && (
        <div className="fixed lg:absolute z-50 w-full lg:w-1/2 bottom-0 lg:top-[20%] lg:left-[25%]">
          <Successfull onClose={() => setSuccessfull(false)} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-2 lg:px-10 gap-6">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            handleShowDetails={() => handleCardClick(job)}
            handleApply={isUserVerified ? () => handleApply(job) : () => {}}
            // handleApply={handleApply}
          />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
