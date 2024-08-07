import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNearJob } from "../../../redux/NearbyJobSlice";

function SearchJobCard({ job }) {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const fetchNearbyJob = () => {
    dispatch(
      fetchNearJob(
        `/api/job-postings/recommend-nearby-jobs?userCity=${job.job_location}`
      )
    );
  };

  return (
    <div
      onClick={fetchNearbyJob}
      className={`job-card-body cursor-pointer w-[95%] m-auto`}>
      <div className="job-card-title">
        <p>{job.job_title}</p> - <p>{job.job_location}</p>
      </div>
    </div>
  );
}

export default SearchJobCard;
