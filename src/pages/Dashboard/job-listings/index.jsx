import React, { useState, useEffect } from "react";
import JobCard from "./_components/card";
import CardDetails from "./_components/card-details";
import Successfull from "./_components/successfull";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [successfull, setSuccessfull] = useState(false);

  const fetchData = async () => {
    const response = await fetch(
      // "/api/job-postings/all"
      "https://nxg-job-hub-8758c68a4346.herokuapp.com/api/job-postings/all?page=0&size=1&sort=string"
    ); // Replace with your API endpoint
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

  const handleApply = () => {
    setSuccessfull(true);
  };

  const handleClose = () => {
    setShowDetails(false);
    setSuccessfull(true);
  };

  return (
    <div className="relative">
      <h2>Job Listing</h2>
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
            handleApply={handleApply}
          />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
