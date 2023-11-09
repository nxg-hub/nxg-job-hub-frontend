import React from 'react'

function SearchJobCard({ job }) {
  return (
    <div>
        <div className="job-card-body">
            <div className="job-card-title">
                {job.title} - <span>{job.location}</span>
            </div>
        </div>
        
    </div>
  )
}

export default SearchJobCard