import React from 'react'

function SearchJobCard({ job }) {
  return (
    <div className="job-card-body">
      <div className="job-card-title">
        <p>{job.title}</p> -  <span>{job.location}</span>
      </div>
    </div>
  );
}

export default SearchJobCard;