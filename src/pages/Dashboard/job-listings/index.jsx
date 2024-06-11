import React from "react";
import JobCard from "./_components/card";
import { JobListDetails } from "./data";

const JobListings = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-20 px-10 gap-6">
      {JobListDetails.map((details) => (
        <JobCard key={details.id} details={details} />
      ))}
    </div>
  );
};

export default JobListings;
