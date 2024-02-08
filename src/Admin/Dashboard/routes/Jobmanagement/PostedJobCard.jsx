import React from 'react'
import { Link } from 'react-router-dom'

export const PostedJobCard = ({jobsToBeVetted}) => {
  return (
    <div className='job-posted'>
        {jobsToBeVetted.map((job) => (
            <div className="job-post-section" key={job.id}>
                <div className="jobs-contents">
                    <div className="job-employer-container">
                        <div className="job-poster">
                            <img src={job.employerPics} alt={job.employerName} />
                        </div>
                        <div className="job-poster-detail">
                            <h4>{job.employerName}</h4>
                            <p>{job.userType}</p>
                        </div>
                    </div>
                    <div className="posted-job-container">
                        <h5>
                            Job Category: <span>{job.jobCategory}</span>
                        </h5>
                        <h5>
                            Budget: <span>{job.budget}</span>
                        </h5>
                        <div className="job-description">
                            <h5>Description:</h5>
                            <p>{job.description}</p>
                        </div>
                        <Link>{job.detailLink}</Link>
                    </div>
                </div>
                <div className="job-posted-btn">
                    <button>Accept</button>
                    <button className='decline-btn'>Decline</button>
                </div>
            </div>
        ))}
    </div>
  )
}
