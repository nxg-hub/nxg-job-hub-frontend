import React, { useState } from "react";
import JobCard from "./_components/card";
import CardDetails from "./_components/card-details";
import { JobListDetails } from "./data";
import Successfull from "./_components/successfull";

const JobListings = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [successfull, setSuccessfull] = useState(false);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
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
      <h2>job Listing</h2>
      {(showDetails || successfull) && (
        <div className="absolute z-20 bg-black bg-opacity-25 top-0 h-full left-0 right-0 bottom-0" />
      )}
      {showDetails && (
        <div className="fixed lg:absolute z-50 w-full lg:w-1/2 h-full overflow-auto lg:top-[8%] bottom-[0%] lg:left-[25%]">
          <CardDetails
            details={JobListDetails.find(
              (details) => details.id === selectedCardId
            )}
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
        {JobListDetails.map((details) => (
          <JobCard
            key={details.id}
            details={details}
            onClick={() => handleCardClick(details.id)}
            handleApply={handleApply}
          />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
