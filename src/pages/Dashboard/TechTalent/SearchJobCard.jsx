import React from 'react'

function SearchJobCard({ job }) {
  return (
    <div className="job-card-body">
      <div className="job-card-title">
        <p>{job.job_title}</p> -  <span>{job.job_location}</span>
      </div>
    </div>
  );
}

export default SearchJobCard;